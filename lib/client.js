window.__ModuleLoader__.load({
  id: "dsh-plugin-marketplace",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    const React = require("react");
    const el = React.createElement;
    const inject = ["slots"];

    const CSS = `.dsh-mkt { display:flex; flex-direction:column; gap:14px; padding:4px 0; font-size:13px; line-height:1.5; color:var(--dsw-alias-label-primary); }
.dsh-mkt-head { display:flex; flex-direction:column; gap:2px; }
.dsh-mkt-title { font-size:16px; font-weight:600; color:var(--dsw-alias-label-primary); }
.dsh-mkt-sub { color:var(--dsw-alias-label-secondary); font-size:12px; }
.dsh-mkt-nav { display:flex; gap:8px; flex-wrap:wrap; }
.dsh-mkt-btn { cursor:pointer; border:1px solid var(--dsw-alias-border-l2); background:var(--dsw-alias-bg-layer-1); color:var(--dsw-alias-label-primary); border-radius:6px; padding:6px 12px; font-size:12.5px; transition:background .12s ease,border-color .12s ease; }
.dsh-mkt-btn:hover { background:var(--dsw-alias-bg-layer-2); }
.dsh-mkt-btn.active { background:var(--dsw-alias-brand-primary); border-color:var(--dsw-alias-brand-primary); color:#fff; }
.dsh-mkt-btn.danger { border-color:var(--dsw-alias-state-error-primary); color:var(--dsw-alias-state-error-primary); }
.dsh-mkt-btn.danger:hover { background:var(--dsw-alias-state-error-primary); color:#fff; }
.dsh-mkt-btn:disabled { opacity:.5; cursor:not-allowed; }
.dsh-mkt-row { display:flex; gap:8px; align-items:center; }
.dsh-mkt-input { flex:1; border:1px solid var(--dsw-alias-border-l2); background:var(--dsw-alias-bg-layer-1); color:var(--dsw-alias-label-primary); border-radius:6px; padding:7px 10px; font-size:12.5px; }
.dsh-mkt-input:focus { outline:none; border-color:var(--dsw-alias-brand-primary); }
.dsh-mkt-chips { display:flex; gap:6px; flex-wrap:wrap; }
.dsh-mkt-chip-btn { cursor:pointer; border:1px solid var(--dsw-alias-border-l1); background:transparent; color:var(--dsw-alias-label-secondary); border-radius:999px; padding:3px 10px; font-size:11.5px; }
.dsh-mkt-chip-btn.active, .dsh-mkt-chip-btn:hover { color:var(--dsw-alias-brand-primary); border-color:var(--dsw-alias-brand-primary); }
.dsh-mkt-list { display:flex; flex-direction:column; gap:10px; }
.dsh-mkt-card { border:1px solid var(--dsw-alias-border-l1); background:var(--dsw-alias-bg-layer-1); border-radius:8px; padding:11px 13px; display:flex; flex-direction:column; gap:7px; }
.dsh-mkt-card-top { display:flex; align-items:baseline; justify-content:space-between; gap:8px; }
.dsh-mkt-name { font-weight:600; color:var(--dsw-alias-brand-primary); text-decoration:none; font-size:13px; }
.dsh-mkt-name:hover { text-decoration:underline; }
.dsh-mkt-stars { color:var(--dsw-alias-state-warn-primary); font-size:12px; white-space:nowrap; }
.dsh-mkt-desc { color:var(--dsw-alias-label-secondary); font-size:12.5px; }
.dsh-mkt-meta { display:flex; gap:6px; flex-wrap:wrap; }
.dsh-mkt-tag { border:1px solid var(--dsw-alias-border-l1); color:var(--dsw-alias-label-secondary); border-radius:4px; padding:1px 7px; font-size:11px; }
.dsh-mkt-tag.topic { color:var(--dsw-alias-brand-primary); }
.dsh-mkt-card-actions { display:flex; gap:8px; align-items:center; justify-content:space-between; margin-top:2px; }
.dsh-mkt-link { color:var(--dsw-alias-label-secondary); font-size:12px; text-decoration:none; }
.dsh-mkt-link:hover { text-decoration:underline; }
.dsh-mkt-error { border:1px solid var(--dsw-alias-state-error-primary); color:var(--dsw-alias-state-error-primary); background:color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent); border-radius:6px; padding:8px 10px; font-size:12px; }
.dsh-mkt-notice { border:1px solid var(--dsw-alias-state-warn-primary); color:var(--dsw-alias-label-secondary); background:color-mix(in srgb, var(--dsw-alias-state-warn-primary) 8%, transparent); border-radius:6px; padding:8px 10px; font-size:12px; }
.dsh-mkt-hint { color:var(--dsw-alias-label-secondary); font-size:12px; }
.dsh-mkt-empty { color:var(--dsw-alias-label-secondary); font-size:13px; padding:18px 0; }
.dsh-mkt-readme { max-height:240px; overflow:auto; white-space:pre-wrap; word-break:break-word; background:var(--dsw-alias-bg-layer-2); border:1px solid var(--dsw-alias-border-l1); border-radius:6px; padding:10px; font-size:11.5px; color:var(--dsw-alias-label-secondary); font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; }
.dsh-mkt-pager { display:flex; gap:8px; align-items:center; }
.dsh-mkt-page { color:var(--dsw-alias-label-secondary); font-size:12px; }
`;

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
      const cls = "dsh-mkt-btn" + (opts.active ? " active" : "") + (opts.danger ? " danger" : "") + (opts.className ? " " + opts.className : "");
      return el("button", { className: cls, disabled: !!opts.disabled, onClick: onClick }, label);
    }

    function RepoCard(props) {
      const repo = props.repo;
      const meta = [];
      if (repo.language) meta.push(repo.language);
      if (repo.license) meta.push(repo.license);
      const topics = (repo.topics || []).slice(0, 3);
      return el("div", { className: "dsh-mkt-card" },
        el("div", { className: "dsh-mkt-card-top" },
          el("a", { className: "dsh-mkt-name", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, repo.full),
          el("span", { className: "dsh-mkt-stars" }, "★ " + repo.stars)
        ),
        repo.description ? el("div", { className: "dsh-mkt-desc" }, repo.description) : null,
        el("div", { className: "dsh-mkt-meta" },
          meta.map(function (m) { return el("span", { key: m, className: "dsh-mkt-tag" }, m); }),
          topics.map(function (t) { return el("span", { key: t, className: "dsh-mkt-tag topic" }, t); })
        ),
        el("div", { className: "dsh-mkt-card-actions" },
          el("a", { className: "dsh-mkt-link", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, "查看源码"),
          btn(props.busy ? "处理中…" : (props.enabled ? "已启用 · 停用" : "启用"), function () { props.onToggle(repo); }, { danger: props.enabled, disabled: props.busy })
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
          btn("搜索", function () { doSearch(1); }, { disabled: loading })
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
        loading ? el("div", { className: "dsh-mkt-hint" }, "加载中…") : null,
        !loading && !error ? el("div", { className: "dsh-mkt-hint" }, "共 " + total + " 个仓库（按星标排序）") : null,
        el("div", { className: "dsh-mkt-list" },
          items.map(function (repo) {
            return el(RepoCard, { key: repo.full, repo: repo, enabled: !!props.enabledNames[repo.full], busy: busy === repo.full, onToggle: toggle });
          })
        ),
        items.length > 0 ? el("div", { className: "dsh-mkt-pager" },
          btn("上一页", function () { doSearch(Math.max(1, page - 1)); }, { disabled: loading || page <= 1 }),
          el("span", { className: "dsh-mkt-page" }, "第 " + page + " 页"),
          btn("下一页", function () { doSearch(page + 1); }, { disabled: loading })
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
          btn("导入并预览", doImport, { disabled: loading })
        ),
        error ? el("div", { className: "dsh-mkt-error" }, error) : null,
        notice ? el("div", { className: "dsh-mkt-notice" }, notice) : null,
        loading ? el("div", { className: "dsh-mkt-hint" }, "正在读取仓库信息…") : null,
        repo ? el("div", { className: "dsh-mkt-card" },
          el("div", { className: "dsh-mkt-card-top" },
            el("a", { className: "dsh-mkt-name", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, repo.full),
            el("span", { className: "dsh-mkt-stars" }, "★ " + repo.stars)
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
            btn(busy ? "处理中…" : (props.enabledNames[repo.full] ? "已启用 · 停用" : "添加并启用"), toggle, { danger: !!props.enabledNames[repo.full], disabled: busy })
          )
        ) : null
      );
    }

    function EnabledView(props) {
      const [notice, setNotice] = React.useState("");
      if (props.enabledList.length === 0) {
        return el("div", { className: "dsh-mkt-empty" }, "尚未启用任何插件。请到「浏览」或「导入」页添加。");
      }
      return el("div", null,
        el("div", { className: "dsh-mkt-notice" }, "已启用列表已持久化到 ~/.dsh/plugin-marketplace.json，重启后依然保留。"),
        notice ? el("div", { className: "dsh-mkt-notice" }, notice) : null,
        el("div", { className: "dsh-mkt-list" },
          props.enabledList.map(function (repo) {
            return el("div", { key: repo.full, className: "dsh-mkt-card" },
              el("div", { className: "dsh-mkt-card-top" },
                el("a", { className: "dsh-mkt-name", href: repo.htmlUrl, target: "_blank", rel: "noreferrer noopener" }, repo.full),
                el("span", { className: "dsh-mkt-stars" }, "★ " + repo.stars)
              ),
              repo.description ? el("div", { className: "dsh-mkt-desc" }, repo.description) : null,
              el("div", { className: "dsh-mkt-card-actions" },
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

    function Marketplace() {
      const [tab, setTab] = React.useState("browse");
      const [enabledList, setEnabledList] = React.useState([]);

      React.useEffect(function () {
        call(api.enabled()).then(function (list) {
          setEnabledList(Array.isArray(list) ? list : []);
        }).catch(function () {});
      }, []);

      const enabledNames = {};
      enabledList.forEach(function (p) { if (p && p.full) enabledNames[p.full] = true; });

      const body = tab === "browse" ? el(BrowseView, { enabledNames: enabledNames, setEnabledList: setEnabledList })
        : tab === "import" ? el(ImportView, { enabledNames: enabledNames, setEnabledList: setEnabledList })
        : el(EnabledView, { enabledList: enabledList, setEnabledList: setEnabledList });

      return el("div", { className: "dsh-mkt" },
        el("div", { className: "dsh-mkt-head" },
          el("div", { className: "dsh-mkt-title" }, "插件市场"),
          el("div", { className: "dsh-mkt-sub" }, "浏览、导入 GitHub 上的 DSH 插件；启用列表已持久化保存")
        ),
        el("div", { className: "dsh-mkt-nav" },
          btn("浏览", function () { setTab("browse"); }, { active: tab === "browse" }),
          btn("导入仓库", function () { setTab("import"); }, { active: tab === "import" }),
          btn("已启用 (" + enabledList.length + ")", function () { setTab("enabled"); }, { active: tab === "enabled" })
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
