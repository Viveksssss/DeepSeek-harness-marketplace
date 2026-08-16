window.__ModuleLoader__.load({
  id: "dsh-plugin-marketplace",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    const React = require("react");
    const el = React.createElement;
    const inject = ["slots"];

    const CSS = `.dsh-mkt { --mkt-accent: var(--dsw-alias-brand-primary, #4d7cfe); --mkt-radius: 12px; display:flex; flex-direction:column; gap:20px; padding:6px 0 12px; font-size:13px; line-height:1.55; color:var(--dsw-alias-label-primary); }
.dsh-mkt-head { display:flex; align-items:center; gap:12px; }
.dsh-mkt-logo { width:42px; height:42px; flex:none; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700; color:#fff; border-radius:12px; background:linear-gradient(135deg, var(--mkt-accent), color-mix(in srgb, var(--mkt-accent) 55%, #8b5cf6)); box-shadow:0 6px 18px color-mix(in srgb, var(--mkt-accent) 35%, transparent); }
.dsh-mkt-head-text { display:flex; flex-direction:column; gap:2px; min-width:0; }
.dsh-mkt-title { font-size:17px; font-weight:650; letter-spacing:.2px; }
.dsh-mkt-sub { color:var(--dsw-alias-label-secondary); font-size:12.5px; }
.dsh-mkt-nav { display:flex; gap:4px; flex-wrap:wrap; padding:4px; border-radius:12px; background:color-mix(in srgb, var(--dsw-alias-label-secondary) 6%, transparent); }
.dsh-mkt-nav-btn { appearance:none; cursor:pointer; display:inline-flex; align-items:center; gap:6px; border:1px solid transparent; border-radius:9px; padding:7px 14px; font-size:12.5px; font-weight:500; color:var(--dsw-alias-label-secondary); background:transparent; transition:color .15s ease, background .15s ease, border-color .15s ease, box-shadow .15s ease; }
.dsh-mkt-nav-btn:hover { color:var(--dsw-alias-label-primary); }
.dsh-mkt-nav-btn.active { color:var(--mkt-accent); background:var(--dsw-alias-bg-layer-1); border-color:var(--dsw-alias-border-l2); box-shadow:0 1px 4px color-mix(in srgb, var(--dsw-alias-label-secondary) 18%, transparent); }
.dsh-mkt-badge { min-width:18px; padding:0 5px; border-radius:999px; font-size:10.5px; font-weight:600; line-height:17px; text-align:center; color:#fff; background:var(--mkt-accent); }
.dsh-mkt-row { display:flex; gap:8px; align-items:center; }
.dsh-mkt-input { flex:1; min-width:0; border:1px solid var(--dsw-alias-border-l2); background:var(--dsw-alias-bg-layer-1); color:var(--dsw-alias-label-primary); border-radius:10px; padding:9px 12px; font-size:13px; transition:border-color .15s ease, box-shadow .15s ease; }
.dsh-mkt-input::placeholder { color:var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary)); }
.dsh-mkt-input:focus { outline:none; border-color:var(--mkt-accent); box-shadow:0 0 0 3px color-mix(in srgb, var(--mkt-accent) 18%, transparent); }
.dsh-mkt-chips { display:flex; gap:6px; flex-wrap:wrap; }
.dsh-mkt-chip-btn { cursor:pointer; border:1px solid var(--dsw-alias-border-l1); background:transparent; color:var(--dsw-alias-label-secondary); border-radius:999px; padding:4px 12px; font-size:11.5px; transition:color .15s ease, border-color .15s ease, background .15s ease; }
.dsh-mkt-chip-btn:hover { color:var(--mkt-accent); border-color:var(--mkt-accent); }
.dsh-mkt-chip-btn.active { color:var(--mkt-accent); border-color:var(--mkt-accent); background:color-mix(in srgb, var(--mkt-accent) 10%, transparent); }
.dsh-mkt-btn { appearance:none; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:6px; border:1px solid var(--dsw-alias-border-l2); border-radius:9px; padding:7px 14px; font-size:12.5px; font-weight:500; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); white-space:nowrap; transition:background .15s ease, border-color .15s ease, color .15s ease, opacity .15s ease, transform .05s ease; }
.dsh-mkt-btn:hover:not(:disabled) { background:var(--dsw-alias-bg-layer-2); }
.dsh-mkt-btn:active:not(:disabled) { transform:translateY(1px); }
.dsh-mkt-btn:disabled { opacity:.5; cursor:not-allowed; }
.dsh-mkt-btn.primary { background:var(--mkt-accent); border-color:var(--mkt-accent); color:#fff; }
.dsh-mkt-btn.primary:hover:not(:disabled) { background:color-mix(in srgb, var(--mkt-accent) 86%, #000); border-color:transparent; }
.dsh-mkt-btn.ghost { background:transparent; }
.dsh-mkt-btn.danger { color:var(--dsw-alias-state-error-primary); border-color:var(--dsw-alias-state-error-primary); background:transparent; }
.dsh-mkt-btn.danger:hover:not(:disabled) { background:var(--dsw-alias-state-error-primary); color:#fff; }
.dsh-mkt-hint { color:var(--dsw-alias-label-secondary); font-size:12px; }
.dsh-mkt-status-row { display:flex; align-items:center; gap:8px; }
.dsh-mkt-error { border:1px solid var(--dsw-alias-state-error-primary); color:var(--dsw-alias-state-error-primary); background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent); border-radius:10px; padding:9px 12px; font-size:12px; }
.dsh-mkt-notice { border:1px solid var(--dsw-alias-state-warn-primary); color:var(--dsw-alias-label-secondary); background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, transparent); border-radius:10px; padding:9px 12px; font-size:12px; }
.dsh-mkt-body { width:100%; min-width:0; }
.dsh-mkt-list { display:flex; flex-direction:column; gap:12px; width:100%; }
.dsh-mkt-card { border:1px solid var(--dsw-alias-border-l1); background:var(--dsw-alias-bg-layer-1); border-radius:var(--mkt-radius); padding:15px 16px; display:flex; flex-direction:column; gap:9px; transition:border-color .15s ease, box-shadow .15s ease; }
.dsh-mkt-card:hover { border-color:color-mix(in srgb, var(--mkt-accent) 42%, var(--dsw-alias-border-l1)); box-shadow:0 6px 20px color-mix(in srgb, var(--dsw-alias-label-secondary) 12%, transparent); }
.dsh-mkt-card-top { display:flex; align-items:baseline; justify-content:space-between; gap:10px; }
.dsh-mkt-name { font-weight:600; color:var(--mkt-accent); text-decoration:none; font-size:13.5px; overflow-wrap:anywhere; }
.dsh-mkt-name:hover { text-decoration:underline; }
.dsh-mkt-stats { display:inline-flex; align-items:center; gap:6px; color:var(--dsw-alias-state-warn-primary); font-size:12px; white-space:nowrap; }
.dsh-mkt-desc { color:var(--dsw-alias-label-secondary); font-size:12.5px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.dsh-mkt-meta { display:flex; gap:6px; flex-wrap:wrap; }
.dsh-mkt-tag { border:1px solid var(--dsw-alias-border-l1); color:var(--dsw-alias-label-secondary); border-radius:6px; padding:1px 8px; font-size:11px; }
.dsh-mkt-tag.topic { color:var(--mkt-accent); border-color:color-mix(in srgb, var(--mkt-accent) 35%, transparent); background:color-mix(in srgb, var(--mkt-accent) 8%, transparent); }
.dsh-mkt-card-actions { display:flex; gap:8px; align-items:center; justify-content:space-between; margin-top:auto; }
.dsh-mkt-link { color:var(--dsw-alias-label-secondary); font-size:12px; text-decoration:none; }
.dsh-mkt-link:hover { text-decoration:underline; }
.dsh-mkt-readme { max-height:260px; overflow:auto; white-space:pre-wrap; word-break:break-word; background:var(--dsw-alias-bg-layer-2); border:1px solid var(--dsw-alias-border-l1); border-radius:10px; padding:12px; font-size:11.5px; color:var(--dsw-alias-label-secondary); font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; }
.dsh-mkt-pager { display:flex; gap:8px; align-items:center; justify-content:center; padding-top:4px; }
.dsh-mkt-page { color:var(--dsw-alias-label-secondary); font-size:12px; }
.dsh-mkt-empty { display:flex; flex-direction:column; align-items:center; gap:8px; color:var(--dsw-alias-label-secondary); font-size:13px; padding:40px 20px; text-align:center; }
.dsh-mkt-empty-icon { font-size:30px; opacity:.5; }
.dsh-mkt-spinner { width:15px; height:15px; border:2px solid color-mix(in srgb, var(--mkt-accent) 25%, transparent); border-top-color:var(--mkt-accent); border-radius:50%; animation:dsh-mkt-spin .7s linear infinite; }
@keyframes dsh-mkt-spin { to { transform:rotate(360deg); } }
.dsh-mkt-settings { display:flex; flex-direction:column; gap:22px; }
.dsh-mkt-settings-section { display:flex; flex-direction:column; gap:8px; }
.dsh-mkt-settings-label { font-size:13px; font-weight:600; color:var(--dsw-alias-label-primary); }
.dsh-mkt-settings-hint { font-size:12px; color:var(--dsw-alias-label-secondary); }
.dsh-mkt-swatches { display:flex; gap:10px; flex-wrap:wrap; }
.dsh-mkt-swatch { cursor:pointer; width:34px; height:34px; border-radius:50%; border:2px solid transparent; background:transparent; padding:0; display:flex; align-items:center; justify-content:center; transition:border-color .15s ease, transform .12s ease; }
.dsh-mkt-swatch:hover { transform:scale(1.08); }
.dsh-mkt-swatch.active { border-color:var(--dsw-alias-label-primary); }
.dsh-mkt-swatch-dot { width:22px; height:22px; border-radius:50%; display:block; }
.dsh-mkt-seg { display:inline-flex; gap:4px; padding:4px; border-radius:10px; background:color-mix(in srgb, var(--dsw-alias-label-secondary) 6%, transparent); align-self:flex-start; }
.dsh-mkt-seg-btn { appearance:none; cursor:pointer; border:1px solid transparent; border-radius:7px; padding:6px 14px; font-size:12.5px; color:var(--dsw-alias-label-secondary); background:transparent; transition:color .15s ease, background .15s ease, box-shadow .15s ease; }
.dsh-mkt-seg-btn.active { color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-layer-1); box-shadow:0 1px 3px color-mix(in srgb, var(--dsw-alias-label-secondary) 20%, transparent); }
.dsh-mkt.compact { gap:14px; }
.dsh-mkt.compact .dsh-mkt-card { padding:12px 14px; gap:6px; }
.dsh-mkt.compact .dsh-mkt-list { gap:8px; }
`;

    const ACCENTS = [
      { id: "auto", label: "自动", color: null },
      { id: "blue", label: "蓝", color: "#4d7cfe" },
      { id: "violet", label: "紫", color: "#8b5cf6" },
      { id: "green", label: "绿", color: "#10b981" },
      { id: "amber", label: "橙", color: "#f59e0b" },
      { id: "rose", label: "玫", color: "#ec4899" },
      { id: "cyan", label: "青", color: "#06b6d4" }
    ];
    const UI_KEY = "dsh.marketplace.ui.v1";

    function defaultUI() {
      return { accent: "auto", layout: "grid", density: "comfortable" };
    }

    function loadUISettings() {
      try {
        const raw = window.localStorage.getItem(UI_KEY);
        if (raw) {
          const v = JSON.parse(raw);
          return {
            accent: typeof v.accent === "string" ? v.accent : "auto",
            layout: v.layout === "list" ? "list" : "grid",
            density: v.density === "compact" ? "compact" : "comfortable"
          };
        }
      } catch { /* ignore */ }
      return defaultUI();
    }

    function saveUISettings(v) {
      try { window.localStorage.setItem(UI_KEY, JSON.stringify(v)); } catch { /* ignore */ }
    }

    function accentColor(id) {
      for (const a of ACCENTS) if (a.id === id) return a.color;
      return null;
    }

    async function post(path, payload) {
      let response;
      try {
        response = await fetch(path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload || {}) });
      } catch {
        return { ok: false, error: { code: "internal", message: "市场服务不可用" } };
      }
      try {
        const envelope = await response.json();
        if (envelope && envelope.ok === true) return { ok: true, value: envelope.value };
        return { ok: false, error: (envelope && envelope.error) || { code: "internal", message: "未知错误" } };
      } catch {
        return { ok: false, error: { code: "internal", message: "响应不是有效 JSON" } };
      }
    }

    const api = {
      browse: (query, page) => post("/marketplace/browse", { query, page }),
      importRepo: (url) => post("/marketplace/import", { url }),
      enable: (url) => post("/marketplace/enable", { url }),
      disable: (url) => post("/marketplace/disable", { url }),
      enabled: () => post("/marketplace/enabled", {})
    };

    async function call(task) {
      const res = await task;
      if (!res.ok) throw new Error((res.error && res.error.message) || "未知错误");
      return res.value;
    }

    function btn(label, onClick, opts) {
      opts = opts || {};
      const cls = "dsh-mkt-btn" +
        (opts.variant ? " " + opts.variant : "") +
        (opts.danger ? " danger" : "") +
        (opts.className ? " " + opts.className : "");
      return el("button", { className: cls, disabled: !!opts.disabled, onClick: onClick }, label);
    }

    function navTab(id, label, count, tab, setTab) {
      return el("button", {
        className: "dsh-mkt-nav-btn" + (tab === id ? " active" : ""),
        onClick: function () { setTab(id); }
      }, label, count !== null && count !== undefined ? el("span", { className: "dsh-mkt-badge" }, String(count)) : null);
    }

    function segBtn(label, active, onClick) {
      return el("button", { className: "dsh-mkt-seg-btn" + (active ? " active" : ""), onClick: onClick }, label);
    }

    function spinner() {
      return el("span", { className: "dsh-mkt-spinner" }, null);
    }

    function browseListProps(layout) {
      if (layout === "grid") {
        return {
          className: "dsh-mkt-list",
          style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "14px", alignItems: "stretch" }
        };
      }
      return { className: "dsh-mkt-list" };
    }

    function RepoCard(props) {
      const repo = props.repo;
      const meta = [];
      if (repo.language) meta.push({ text: repo.language, topic: false });
      if (repo.license) meta.push({ text: repo.license, topic: false });
      (repo.topics || []).slice(0, 3).forEach(function (t) { meta.push({ text: t, topic: true }); });
      return el("div", { className: "dsh-mkt-card" },
        el("div", { className: "dsh-mkt-card-top" },
          el("a", { className: "dsh-mkt-name", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, repo.full),
          el("span", { className: "dsh-mkt-stats" }, "★ " + repo.stars)
        ),
        repo.description ? el("div", { className: "dsh-mkt-desc" }, repo.description) : null,
        meta.length > 0 ? el("div", { className: "dsh-mkt-meta" },
          meta.map(function (m) { return el("span", { key: m.text, className: "dsh-mkt-tag" + (m.topic ? " topic" : "") }, m.text); })
        ) : null,
        el("div", { className: "dsh-mkt-card-actions" },
          el("a", { className: "dsh-mkt-link", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, "查看源码"),
          btn(props.busy ? "处理中…" : (props.enabled ? "已启用 · 停用" : "启用"), function () { props.onToggle(repo); }, { danger: props.enabled, variant: props.enabled ? null : "primary", disabled: props.busy })
        )
      );
    }

    function BrowseView(props) {
      const [query, setQuery] = React.useState("topic:dsh-plugin");
      const [items, setItems] = React.useState([]);
      const [total, setTotal] = React.useState(0);
      const [page, setPage] = React.useState(1);
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState("");
      const [busy, setBusy] = React.useState("");
      const [notice, setNotice] = React.useState("");

      async function doSearch(nextPage, q) {
        setLoading(true); setError("");
        try {
          const value = await call(api.browse(q !== undefined ? q : query, nextPage));
          setItems(Array.isArray(value.items) ? value.items : []);
          setTotal(Number(value.total) || 0);
          setPage(nextPage);
        } catch (e) { setError(String((e && e.message) || e)); }
        finally { setLoading(false); }
      }

      React.useEffect(function () { doSearch(1); }, []);

      async function toggle(repo) {
        setBusy(repo.full);
        setError("");
        setNotice("");
        try {
          const isOn = !!props.enabledNames[repo.full];
          const value = await call(isOn ? api.disable(repo.full) : api.enable(repo.full));
          props.setEnabledList(Array.isArray(value.enabled) ? value.enabled : []);
          if (value && value.restartRequired) setNotice("操作已保存：已" + (isOn ? "卸载" : "安装") + "插件，重启 DSH 后生效。");
        } catch (e) { setError(String((e && e.message) || e)); }
        finally { setBusy(""); }
      }

      return el("div", null,
        el("div", { className: "dsh-mkt-row" },
          el("input", {
            className: "dsh-mkt-input", value: query,
            placeholder: "搜索 GitHub 仓库，例如 topic:dsh-plugin",
            onChange: function (e) { setQuery(e.target.value); },
            onKeyDown: function (e) { if (e.key === "Enter") doSearch(1); }
          }),
          btn("搜索", function () { doSearch(1); }, { variant: "primary", disabled: loading })
        ),
        el("div", { className: "dsh-mkt-chips" },
          ["topic:dsh-plugin", "topic:dsh-theme", "topic:dsh-skill", "deepseek-harness"].map(function (t) {
            return el("button", {
              key: t, className: "dsh-mkt-chip-btn" + (query === t ? " active" : ""),
              onClick: function () { setQuery(t); doSearch(1, t); }
            }, t);
          })
        ),
        error ? el("div", { className: "dsh-mkt-error" }, error) : null,
        notice ? el("div", { className: "dsh-mkt-notice" }, notice) : null,
        loading ? el("div", { className: "dsh-mkt-status-row" }, spinner(), el("span", { className: "dsh-mkt-hint" }, "加载中…")) : null,
        !loading && !error ? el("div", { className: "dsh-mkt-hint" }, "共 " + total + " 个仓库 · " + (props.layout === "list" ? "列表" : "网格") + "布局 · 按星标排序") : null,
        items.length > 0 ? el("div", browseListProps(props.layout),
          items.map(function (repo) {
            return el(RepoCard, { key: repo.full, repo: repo, enabled: !!props.enabledNames[repo.full], busy: busy === repo.full, onToggle: toggle });
          })
        ) : (!loading && !error ? el("div", { className: "dsh-mkt-empty" },
          el("div", { className: "dsh-mkt-empty-icon" }, "📦"),
          el("div", null, "没有找到匹配的插件仓库")
        ) : null),
        items.length > 0 ? el("div", { className: "dsh-mkt-pager" },
          btn("上一页", function () { doSearch(Math.max(1, page - 1)); }, { variant: "ghost", disabled: loading || page <= 1 }),
          el("span", { className: "dsh-mkt-page" }, "第 " + page + " 页"),
          btn("下一页", function () { doSearch(page + 1); }, { variant: "ghost", disabled: loading })
        ) : null
      );
    }

    function ImportView(props) {
      const [url, setUrl] = React.useState("");
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState("");
      const [repo, setRepo] = React.useState(null);
      const [busy, setBusy] = React.useState(false);
      const [notice, setNotice] = React.useState("");

      async function doImport() {
        if (!url.trim()) { setError("请输入仓库地址或 owner/repo"); return; }
        setLoading(true); setError(""); setRepo(null);
        try {
          const value = await call(api.importRepo(url));
          setRepo(value.repo);
        } catch (e) { setError(String((e && e.message) || e)); }
        finally { setLoading(false); }
      }

      async function toggle() {
        const isOn = !!props.enabledNames[repo.full];
        setBusy(true);
        setError("");
        setNotice("");
        try {
          const value = await call(isOn ? api.disable(repo.full) : api.enable(repo.full));
          props.setEnabledList(Array.isArray(value.enabled) ? value.enabled : []);
          if (value && value.restartRequired) setNotice("操作已保存：已" + (isOn ? "卸载" : "安装") + "插件，重启 DSH 后生效。");
        } catch (e) { setError(String((e && e.message) || e)); }
        finally { setBusy(false); }
      }

      return el("div", null,
        el("div", { className: "dsh-mkt-row" },
          el("input", {
            className: "dsh-mkt-input", value: url,
            placeholder: "例如 deepseek-ai/deepseek-harness 或完整 GitHub URL",
            onChange: function (e) { setUrl(e.target.value); },
            onKeyDown: function (e) { if (e.key === "Enter") doImport(); }
          }),
          btn("导入并预览", doImport, { variant: "primary", disabled: loading })
        ),
        error ? el("div", { className: "dsh-mkt-error" }, error) : null,
        notice ? el("div", { className: "dsh-mkt-notice" }, notice) : null,
        loading ? el("div", { className: "dsh-mkt-status-row" }, spinner(), el("span", { className: "dsh-mkt-hint" }, "正在读取仓库信息…")) : null,
        repo ? el("div", { className: "dsh-mkt-card" },
          el("div", { className: "dsh-mkt-card-top" },
            el("a", { className: "dsh-mkt-name", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, repo.full),
            el("span", { className: "dsh-mkt-stats" }, "★ " + repo.stars)
          ),
          repo.description ? el("div", { className: "dsh-mkt-desc" }, repo.description) : null,
          el("div", { className: "dsh-mkt-meta" },
            repo.language ? el("span", { className: "dsh-mkt-tag" }, repo.language) : null,
            repo.license ? el("span", { className: "dsh-mkt-tag" }, repo.license) : null,
            (repo.topics || []).slice(0, 4).map(function (t) { return el("span", { key: t, className: "dsh-mkt-tag topic" }, t); })
          ),
          repo.readme ? el("pre", { className: "dsh-mkt-readme" }, repo.readme) : null,
          el("div", { className: "dsh-mkt-card-actions" },
            el("span", { className: "dsh-mkt-hint" }, "默认分支：" + repo.defaultBranch),
            btn(busy ? "处理中…" : (props.enabledNames[repo.full] ? "已启用 · 停用" : "添加并启用"), toggle, { danger: !!props.enabledNames[repo.full], variant: props.enabledNames[repo.full] ? null : "primary", disabled: busy })
          )
        ) : null
      );
    }

    function EnabledView(props) {
      const [notice, setNotice] = React.useState("");
      if (props.enabledList.length === 0) {
        return el("div", { className: "dsh-mkt-empty" },
          el("div", { className: "dsh-mkt-empty-icon" }, "🧩"),
          el("div", null, "尚未启用任何插件"),
          el("div", { className: "dsh-mkt-hint" }, "请到「浏览」或「导入」页添加插件")
        );
      }
      return el("div", null,
        el("div", { className: "dsh-mkt-notice" }, "已启用列表已持久化到 ~/.dsh/plugin-marketplace.json，重启后依然保留。"),
        notice ? el("div", { className: "dsh-mkt-notice" }, notice) : null,
        el("div", { className: "dsh-mkt-list" },
          props.enabledList.map(function (repo) {
            return el("div", { key: repo.full, className: "dsh-mkt-card" },
              el("div", { className: "dsh-mkt-card-top" },
                el("a", { className: "dsh-mkt-name", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, repo.full),
                el("span", { className: "dsh-mkt-stats" }, "★ " + repo.stars)
              ),
              repo.description ? el("div", { className: "dsh-mkt-desc" }, repo.description) : null,
              el("div", { className: "dsh-mkt-card-actions" },
                el("span", { className: "dsh-mkt-hint" }, repo.pkgName ? "包名 " + repo.pkgName : ""),
                btn("停用", function () {
                  call(api.disable(repo.full)).then(function (value) {
                    props.setEnabledList(Array.isArray(value.enabled) ? value.enabled : []);
                    if (value && value.restartRequired) setNotice("已卸载插件，重启 DSH 后生效。");
                  }).catch(function () {});
                }, { danger: true })
              )
            );
          })
        )
      );
    }

    function AppearanceView(props) {
      const ui = props.ui;
      const updateUi = props.updateUi;
      return el("div", { className: "dsh-mkt-settings" },
        el("div", { className: "dsh-mkt-settings-section" },
          el("div", { className: "dsh-mkt-settings-label" }, "主题色"),
          el("div", { className: "dsh-mkt-settings-hint" }, "选择插件市场的强调色，「自动」则跟随系统主题"),
          el("div", { className: "dsh-mkt-swatches" },
            ACCENTS.map(function (a) {
              const active = ui.accent === a.id;
              const dotStyle = a.color
                ? { background: a.color }
                : { background: "conic-gradient(#4d7cfe, #8b5cf6, #ec4899, #f59e0b, #10b981, #06b6d4, #4d7cfe)" };
              return el("button", {
                key: a.id,
                className: "dsh-mkt-swatch" + (active ? " active" : ""),
                title: a.label,
                onClick: function () { updateUi({ accent: a.id }); }
              }, el("span", { className: "dsh-mkt-swatch-dot", style: dotStyle }, null));
            })
          )
        ),
        el("div", { className: "dsh-mkt-settings-section" },
          el("div", { className: "dsh-mkt-settings-label" }, "卡片布局"),
          el("div", { className: "dsh-mkt-seg" },
            segBtn("网格", ui.layout === "grid", function () { updateUi({ layout: "grid" }); }),
            segBtn("列表", ui.layout === "list", function () { updateUi({ layout: "list" }); })
          )
        ),
        el("div", { className: "dsh-mkt-settings-section" },
          el("div", { className: "dsh-mkt-settings-label" }, "显示密度"),
          el("div", { className: "dsh-mkt-seg" },
            segBtn("舒适", ui.density === "comfortable", function () { updateUi({ density: "comfortable" }); }),
            segBtn("紧凑", ui.density === "compact", function () { updateUi({ density: "compact" }); })
          )
        ),
        el("div", { className: "dsh-mkt-settings-section" },
          el("div", { className: "dsh-mkt-settings-hint" }, "外观设置保存在浏览器本地（localStorage），仅影响本机的显示。"),
          el("div", null,
            btn("恢复默认", function () { updateUi(defaultUI()); }, { variant: "ghost" })
          )
        )
      );
    }

    function Marketplace() {
      const [tab, setTab] = React.useState("browse");
      const [enabledList, setEnabledList] = React.useState([]);
      const [ui, setUi] = React.useState(loadUISettings);

      React.useEffect(function () {
        call(api.enabled()).then(function (list) {
          setEnabledList(Array.isArray(list) ? list : []);
        }).catch(function () {});
      }, []);

      function updateUi(patch) {
        const next = Object.assign({}, ui, patch);
        setUi(next);
        saveUISettings(next);
      }

      const enabledNames = {};
      enabledList.forEach(function (p) { if (p && p.full) enabledNames[p.full] = true; });

      const accent = accentColor(ui.accent);
      const rootCls = "dsh-mkt" + (ui.density === "compact" ? " compact" : "");

      const body = tab === "browse" ? el(BrowseView, { enabledNames: enabledNames, setEnabledList: setEnabledList, layout: ui.layout })
        : tab === "import" ? el(ImportView, { enabledNames: enabledNames, setEnabledList: setEnabledList })
        : tab === "enabled" ? el(EnabledView, { enabledList: enabledList, setEnabledList: setEnabledList })
        : el(AppearanceView, { ui: ui, updateUi: updateUi });

      return el("div", { className: rootCls, style: accent ? { "--mkt-accent": accent } : null },
        el("div", { className: "dsh-mkt-head" },
          el("div", { className: "dsh-mkt-logo" }, "市"),
          el("div", { className: "dsh-mkt-head-text" },
            el("div", { className: "dsh-mkt-title" }, "插件市场"),
            el("div", { className: "dsh-mkt-sub" }, "浏览、导入并管理 GitHub 上的 DSH 插件")
          )
        ),
        el("div", { className: "dsh-mkt-nav" },
          navTab("browse", "浏览", null, tab, setTab),
          navTab("import", "导入", null, tab, setTab),
          navTab("enabled", "已启用", enabledList.length, tab, setTab),
          navTab("appearance", "外观", null, tab, setTab)
        ),
        el("div", { className: "dsh-mkt-body" }, body)
      );
    }

    function apply(ctx) {
      const TAG_ID = "dsh-plugin-marketplace/styles";
      if (document.querySelector("style[data-plugin-css=\"" + TAG_ID + "\"]") === null) {
        const tag = document.createElement("style");
        tag.dataset.pluginCss = TAG_ID;
        tag.textContent = CSS;
        document.head.appendChild(tag);
      }

      ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register(
        { name: "settings.plugins.tab", id: "marketplace", order: 20, label: () => "插件市场" },
        () => el(Marketplace)
      ));
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
