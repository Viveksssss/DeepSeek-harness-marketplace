import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const name = "@local/dsh-plugin-marketplace";
const inject = ["webServer", "subprocess"];

function statePath(home) {
  return join(home, "plugin-marketplace.json");
}

function loadEnabled(home) {
  try {
    const raw = readFileSync(statePath(home), "utf8");
    const data = JSON.parse(raw);
    if (Array.isArray(data.enabled)) return data.enabled;
    return [];
  } catch {
    return [];
  }
}

function saveEnabled(home, list) {
  const p = statePath(home);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), enabled: list }, null, 2) + "\n");
}

function normalizeRepo(input) {
  const s = String(input || "").trim();
  if (!s) throw new Error("请输入 GitHub 仓库（owner/repo 或完整 URL）");
  let owner, repo;
  const m = s.match(/github\.com\/[\s\S]*?([^\/\s#?]+)\/([^\/\s#?]+)/i);
  if (m) { owner = m[1]; repo = m[2]; }
  else {
    const parts = s.split("/").map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) { owner = parts[0]; repo = parts[1]; }
    else throw new Error("无法解析仓库，请使用 owner/repo 形式");
  }
  owner = owner.replace(/\.git$/i, "").replace(/[^\w.-]/g, "");
  repo = repo.replace(/\.git$/i, "").replace(/[^\w.-]/g, "");
  if (!owner || !repo) throw new Error("仓库名无效");
  return { owner, repo, full: owner + "/" + repo };
}

async function ghJson(ctx, path) {
  const url = "https://api.github.com/" + path;
  const spec = {
    argv: ["curl", "-sS", "--max-time", "25", "-H", "Accept: application/vnd.github+json", "-H", "User-Agent: dsh-plugin-marketplace", url],
    stdio: { stdin: "ignore", stdout: { maxBytes: 1 << 20 }, stderr: { maxBytes: 1 << 16 } },
    graceMs: 1e4
  };
  const handle = ctx.subprocess.spawn(spec);
  const outcome = await handle.done;
  const stdout = handle.collected.stdout?.readFrom(0).text ?? "";
  const stderr = handle.collected.stderr?.readFrom(0).text ?? "";
  if (outcome.exitCode !== 0) throw new Error("GitHub 请求失败（exit " + outcome.exitCode + "）：" + stderr.slice(0, 200));
  if (!stdout) throw new Error("GitHub 返回为空");
  let data;
  try { data = JSON.parse(stdout); } catch { throw new Error("GitHub 返回不是有效 JSON"); }
  if (data && typeof data.message === "string" && data.documentation_url) {
    if (/rate limit/i.test(data.message)) throw new Error("已触发 GitHub 速率限制，请稍后再试");
    throw new Error("GitHub 错误：" + data.message);
  }
  return data;
}

function projectRepo(item) {
  return {
    full: item.full_name || "",
    owner: item.owner && item.owner.login ? item.owner.login : "",
    name: item.name || "",
    description: item.description || "",
    htmlUrl: item.html_url || "",
    stars: item.stargazers_count || 0,
    forks: item.forks_count || 0,
    language: item.language || "",
    topics: Array.isArray(item.topics) ? item.topics.slice(0, 8) : [],
    defaultBranch: item.default_branch || "main",
    license: item.license && item.license.spdx_id ? item.license.spdx_id : ""
  };
}

function defaultHome() {
  const env = process.env.DSH_HOME;
  if (env && env.trim()) return env;
  return process.env.HOME ? join(process.env.HOME, ".dsh") : ".";
}

function resolveProfile(ctx) {
  try {
    const base = String((ctx && ctx.baseUrl) || "");
    const match = /^file:\/\/+(.*)$/.exec(base);
    if (match) {
      const parts = decodeURIComponent(match[1]).replace(/[\\/]+$/, "").split("/").filter(Boolean);
      if (parts.length >= 2 && parts[parts.length - 2] === "profiles") return parts[parts.length - 1];
    }
  } catch { /* fall through */ }
  return "web";
}

function readText(collector) {
  try {
    return collector ? collector.readFrom(0).text ?? "" : "";
  } catch {
    return "";
  }
}

// 读取 GitHub 仓库 package.json 的真实 npm 包名（卸载时需要用它定位依赖）。
async function repoPackageName(ctx, r) {
  try {
    const raw = await ghJson(ctx, "repos/" + encodeURIComponent(r.owner) + "/" + encodeURIComponent(r.repo) + "/contents/package.json");
    const b64 = raw && raw.content ? String(raw.content).replace(/\s/g, "") : "";
    if (!b64) return null;
    const parsed = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    return typeof parsed.name === "string" && parsed.name ? parsed.name : null;
  } catch {
    return null;
  }
}

// 读取某 profile 的 package.json 依赖表；读不到返回 null（用于判断插件是否真的已安装）。
function profileDeps(home, profile) {
  try {
    const manifest = JSON.parse(readFileSync(join(home, "profiles", profile, "package.json"), "utf8"));
    return manifest && typeof manifest.dependencies === "object" && manifest.dependencies ? manifest.dependencies : {};
  } catch {
    return null;
  }
}

// 安装后校验：插件包的主入口文件是否真实存在。
// 很多 git 托管插件不提交构建产物 lib/，也没有 prepare 脚本，pnpm 装完会缺入口，
// 一旦进了 bundles，下次 `dsh web` 就会直接 boot 失败。这里提前发现并回滚。
function installedPackageDir(home, profile, pkgName) {
  return join(home, "profiles", profile, "node_modules", pkgName);
}

function packageEntryFile(dir) {
  try {
    const manifest = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    let entry = null;
    const ex = manifest.exports;
    if (typeof ex === "string") entry = ex;
    else if (ex && typeof ex === "object" && ex["."] !== undefined) {
      const dot = ex["."];
      if (typeof dot === "string") entry = dot;
      else if (dot && typeof dot === "object") entry = dot.default || dot.import || dot.require || null;
    }
    if (!entry) entry = manifest.main || "index.js";
    return entry;
  } catch {
    return null;
  }
}

function validateInstalledPackage(home, profile, pkgName) {
  const dir = installedPackageDir(home, profile, pkgName);
  if (!existsSync(join(dir, "package.json"))) {
    return { ok: false, reason: "插件未安装成功（找不到 " + dir + "）" };
  }
  const entry = packageEntryFile(dir);
  if (!entry) return { ok: false, reason: "无法确定插件入口文件" };
  const abs = join(dir, entry.replace(/^\.\//, ""));
  if (!existsSync(abs) || !readFileSync(abs).length) {
    return { ok: false, reason: "插件缺少入口文件 " + entry + "（通常是仓库没提交构建产物 lib/，安装时也没有 prepare/build 生成它）" };
  }
  return { ok: true, entry };
}

// 通过 `dsh plugin` 命令真实安装/卸载插件（复用 DSH 官方的 bundle 注册与 pnpm 协调逻辑）。
async function runCli(ctx, args, timeoutMs = 600000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new Error("操作超时")), timeoutMs);
  let handle;
  try {
    handle = ctx.subprocess.spawn({
      argv: ["dsh", ...args],
      stdio: { stdin: "ignore", stdout: { maxBytes: 1 << 20 }, stderr: { maxBytes: 1 << 20 } },
      graceMs: 1e4,
      signal: controller.signal
    });
  } catch (error) {
    clearTimeout(timer);
    throw new Error("无法启动 dsh 命令：" + String((error && error.message) || error));
  }
  let outcome;
  try {
    outcome = await handle.done;
  } catch (error) {
    clearTimeout(timer);
    throw new Error("运行 dsh plugin 失败：" + String((error && error.message) || error));
  }
  clearTimeout(timer);
  return {
    exitCode: outcome.exitCode,
    stdout: readText(handle.collected && handle.collected.stdout),
    stderr: readText(handle.collected && handle.collected.stderr)
  };
}

const OK = (value) => ({ ok: true, value });
const FAIL = (error) => ({ ok: false, error: { code: "internal", message: String(error && error.message ? error.message : error) } });

function readJson(req, cap) {
  return new Promise((resolve) => {
    const chunks = [];
    let total = 0;
    let done = false;
    const finish = (value) => { if (!done) { done = true; resolve(value); } };
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > cap) { req.destroy(); finish(null); return; }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const text = Buffer.concat(chunks).toString("utf8");
      if (!text) return finish(null);
      try { finish(JSON.parse(text)); } catch { finish(null); }
    });
    req.on("error", () => finish(null));
  });
}

function json(res, envelope, status = 200) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(envelope));
}

async function handle(req, res, state) {
  if (req.method !== "POST") { res.writeHead(405); res.end(); return; }
  const pathname = new URL(req.url || "/", "http://x").pathname;
  const body = await readJson(req, 1 << 20);
  const action = pathname.replace(/^\/marketplace\/?/, "");

  try {
    switch (action) {
      case "browse": {
        const query = body && typeof body.query === "string" && body.query.trim() ? body.query.trim() : "topic:dsh-plugin";
        const page = Math.max(1, Number(body && body.page) || 1);
        const perPage = Math.min(30, Math.max(1, Number(body && body.perPage) || 20));
        const data = await ghJson(state.ctx, "search/repositories?q=" + encodeURIComponent(query) + "&sort=stars&order=desc&page=" + page + "&per_page=" + perPage);
        return json(res, OK({ query, total: data.total_count || 0, items: (data.items || []).map(projectRepo) }));
      }
      case "import": {
        const r = normalizeRepo(body && body.url);
        const meta = projectRepo(await ghJson(state.ctx, "repos/" + encodeURIComponent(r.owner) + "/" + encodeURIComponent(r.repo)));
        let readme = "";
        try {
          const raw = await ghJson(state.ctx, "repos/" + encodeURIComponent(r.owner) + "/" + encodeURIComponent(r.repo) + "/readme");
          const b64 = raw && raw.content ? String(raw.content).replace(/\s/g, "") : "";
          try { readme = b64 ? Buffer.from(b64, "base64").toString("utf8") : ""; } catch { readme = ""; }
          if (readme.length > 6000) readme = readme.slice(0, 6000) + "\n…（已截断）";
        } catch { /* README 可选 */ }
        meta.readme = readme;
        return json(res, OK({ repo: meta, enabled: state.enabled.has(r.full) }));
      }
      case "enable": {
        const r = normalizeRepo(body && body.url);
        const pkgName = (await repoPackageName(state.ctx, r)) || r.repo;
        const run = await runCli(state.ctx, ["plugin", "--profile", state.profile, "add", "github:" + r.full, "--fetch-timeout=300000", "--fetch-retries=3"], 600000);
        if (run.exitCode !== 0) {
          throw new Error("插件安装失败（exit " + String(run.exitCode) + "）：" + (run.stderr || run.stdout || "").slice(-600));
        }
        const check = validateInstalledPackage(state.home, state.profile, pkgName);
        if (!check.ok) {
          // 装上但入口缺失：回滚，避免把 profile 的 bundles 弄坏导致下次 dsh web 无法启动。
          try { await runCli(state.ctx, ["plugin", "--profile", state.profile, "remove", pkgName], 120000); } catch { /* 回滚失败也不影响后续报错 */ }
          throw new Error("插件安装不完整，已自动回滚：" + check.reason + "。请联系插件作者在仓库提交构建产物，或把 build 脚本改成 prepare（git 依赖安装时会执行）。");
        }
        let meta;
        try {
          meta = projectRepo(await ghJson(state.ctx, "repos/" + encodeURIComponent(r.owner) + "/" + encodeURIComponent(r.repo)));
        } catch {
          meta = { full: r.full, owner: r.owner, name: r.repo, description: "", htmlUrl: "https://github.com/" + r.full, stars: 0, forks: 0, language: "", topics: [], defaultBranch: "main", license: "" };
        }
        meta.pkgName = pkgName;
        meta.enabledAt = new Date().toISOString();
        state.enabled.set(r.full, meta);
        state.persist();
        return json(res, OK({ enabled: Array.from(state.enabled.values()), installed: pkgName, restartRequired: true }));
      }
      case "disable": {
        const r = normalizeRepo(body && body.url);
        const record = state.enabled.get(r.full);
        const pkgName = (record && record.pkgName) || r.repo;
        const deps = profileDeps(state.home, state.profile);
        if (deps && typeof deps[pkgName] === "string") {
          const run = await runCli(state.ctx, ["plugin", "--profile", state.profile, "remove", pkgName], 600000);
          if (run.exitCode !== 0) {
            throw new Error("插件卸载失败（exit " + String(run.exitCode) + "）：" + (run.stderr || run.stdout || "").slice(-600));
          }
        }
        state.enabled.delete(r.full);
        state.persist();
        return json(res, OK({ enabled: Array.from(state.enabled.values()), restartRequired: true }));
      }
      case "enabled":
        return json(res, OK(Array.from(state.enabled.values())));
      default:
        res.writeHead(404);
        res.end();
        return;
    }
  } catch (error) {
    return json(res, FAIL(error));
  }
}

function apply(ctx) {
  const home = defaultHome();
  const profile = resolveProfile(ctx);
  const enabled = new Map();
  for (const e of loadEnabled(home)) if (e && e.full) enabled.set(e.full, e);
  const state = {
    ctx,
    home,
    profile,
    enabled,
    persist: () => saveEnabled(home, Array.from(enabled.values()))
  };
  ctx.effect(
    () => ctx.webServer.register({
      kind: "prefix",
      path: "/marketplace",
      handler: (req, res) => { handle(req, res, state).catch(() => {}); }
    }),
    "dsh-plugin-marketplace: /marketplace routes"
  );
}

export { name, inject, apply };
