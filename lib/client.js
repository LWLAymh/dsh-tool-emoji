window.__ModuleLoader__.load({
  id: "dsh-tool-emoji",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    var React = require("react");
    var h = React.createElement;

    var STORAGE_KEY = "dsh-tool-emoji:config:v1";
    var TAG_ID = "dsh-tool-emoji/tool-icons.module.css";

    var DEFAULT_CONFIG = {
      enabled: true,
      tools: {
        think: { enabled: true, emoji: "🤔", image: null },
        read: { enabled: true, emoji: "🧐", image: null },
        web_fetch: { enabled: true, emoji: "🧐", image: null },
        search: { enabled: true, emoji: "🧐", image: null },
        web_search: { enabled: true, emoji: "🧐", image: null },
        grep: { enabled: true, emoji: "🧐", image: null },
        glob: { enabled: true, emoji: "🧐", image: null },
        pwsh: { enabled: true, emoji: "👨‍💻", image: null },
        edit: { enabled: true, emoji: "☝️🤓", image: null },
        str_replace_editor: { enabled: true, emoji: "☝️🤓", image: null }
      },
      error: { enabled: true, emoji: "😫", image: null }
    };

    var TOOL_LABELS = {
      think: "Think",
      read: "Read",
      web_fetch: "Web fetch",
      search: "Search",
      web_search: "Web search",
      grep: "Grep",
      glob: "Glob",
      pwsh: "Pwsh",
      edit: "Edit",
      str_replace_editor: "Str replace editor",
      error: "Error state"
    };

    var PANEL_CSS = [
      ".dte-panel{display:flex;flex-direction:column;gap:12px;padding:4px 0;font-size:13px;color:var(--dsw-alias-label-primary)}",
      ".dte-section{font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);text-transform:uppercase;letter-spacing:.04em;margin-top:4px}",
      ".dte-tool{border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);padding:8px 10px;display:flex;flex-direction:column;gap:8px}",
      ".dte-tool-head{display:flex;align-items:center;justify-content:space-between;gap:8px}",
      ".dte-tool-name{font-weight:600;font-size:13px}",
      ".dte-tool-body{display:flex;align-items:center;gap:8px;flex-wrap:wrap}",
      ".dte-tool input[type=text]{background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:6px 10px;font-size:13px;outline:none;min-width:110px;flex:1 1 140px}",
      ".dte-tool input[type=text]:focus{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-tool input[type=file]{font-size:12px;max-width:220px}",
      ".dte-button{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer}",
      ".dte-button:hover{border-color:var(--dsw-alias-brand-primary)}",
      ".dte-button.danger:hover{border-color:#e5484d;color:#e5484d}",
      ".dte-switch{position:relative;width:34px;height:20px;border-radius:999px;background:var(--dsw-alias-border-l1);cursor:pointer;flex:none;transition:background .15s ease;display:inline-block}",
      ".dte-switch input[type=checkbox]{position:absolute;opacity:0;width:0;height:0;margin:0;pointer-events:none}",
      ".dte-switch::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .15s ease}",
      ".dte-switch.on{background:var(--dsw-alias-brand-primary)}",
      ".dte-switch.on::after{transform:translateX(14px)}",
      ".dte-preview{width:28px;height:28px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;overflow:hidden;background:var(--dsw-alias-bg-base);display:inline-flex;align-items:center;justify-content:center}",
      ".dte-preview img{max-width:100%;max-height:100%;object-fit:contain}",
      ".dte-notice{color:var(--dsw-alias-label-secondary);font-size:12px}",
      ".dte-reset{margin-top:4px}"
    ].join("\n");

    function injectPanelCss() {
      var tagId = "dsh-tool-emoji/settings.module.css";
      if (typeof document === "undefined") return;
      if (document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
        var tag = document.createElement("style");
        tag.dataset.plugin = "dsh-tool-emoji";
        tag.dataset.pluginCss = tagId;
        tag.textContent = PANEL_CSS;
        document.head.appendChild(tag);
      }
    }

    function defaultConfig() {
      return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }

    function loadConfig() {
      if (typeof window === "undefined" || typeof window.localStorage === "undefined") return defaultConfig();
      try {
        var raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultConfig();
        var parsed = JSON.parse(raw);
        var out = defaultConfig();
        if (parsed && typeof parsed.enabled === "boolean") out.enabled = parsed.enabled;
        if (parsed && parsed.tools) {
          for (var key in out.tools) {
            if (!Object.prototype.hasOwnProperty.call(parsed.tools, key)) continue;
            var p = parsed.tools[key];
            if (p && typeof p.enabled === "boolean") out.tools[key].enabled = p.enabled;
            if (p && typeof p.emoji === "string") out.tools[key].emoji = p.emoji;
            if (p && typeof p.image === "string") out.tools[key].image = p.image;
          }
        }
        if (parsed && parsed.error) {
          var e = parsed.error;
          if (e && typeof e.enabled === "boolean") out.error.enabled = e.enabled;
          if (e && typeof e.emoji === "string") out.error.emoji = e.emoji;
          if (e && typeof e.image === "string") out.error.image = e.image;
        }
        return out;
      } catch (_) {
        return defaultConfig();
      }
    }

    function saveConfig(config) {
      if (typeof window === "undefined" || typeof window.localStorage === "undefined") return false;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        return true;
      } catch (_) {
        return false;
      }
    }

    function leadingSelectors(tool) {
      var out = [];
      if (tool === "think") {
        out.push('[data-variant="think"] [data-disclosure-row] > span:first-child');
      } else {
        out.push('[data-tool="' + tool + '"] [data-disclosure-row] > span:first-child');
      }
      if (tool === "pwsh" || tool === "edit" || tool === "str_replace_editor") {
        out.push('.dshg_row[data-tool="' + tool + '"] > .dshg_leading');
      }
      return out;
    }

    function errorIconSelectors(tool) {
      var out = [];
      if (tool === "think") {
        out.push('[data-variant="think"][data-state="error"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state="error"]');
      } else {
        out.push('[data-tool="' + tool + '"][data-state="error"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state="error"]');
      }
      if (tool === "pwsh" || tool === "edit" || tool === "str_replace_editor") {
        out.push('.dshg_row[data-tool="' + tool + '"][data-state="error"] > .dshg_leading > svg[data-state="error"]');
      }
      return out;
    }

    function errorPseudoSelectors(tool) {
      var out = [];
      if (tool === "think") {
        out.push('[data-variant="think"][data-state="error"] [data-disclosure-row] > span:first-child::before');
      } else {
        out.push('[data-tool="' + tool + '"][data-state="error"] [data-disclosure-row] > span:first-child::before');
      }
      if (tool === "pwsh" || tool === "edit" || tool === "str_replace_editor") {
        out.push('.dshg_row[data-tool="' + tool + '"][data-state="error"] > .dshg_leading::before');
      }
      return out;
    }

    function isDshgSelector(sel) {
      return sel.indexOf(".dshg_") !== -1;
    }

    function iconSelector(sel, stateFilter) {
      var child = isDshgSelector(sel)
        ? "> svg"
        : "> span:first-child svg";
      if (stateFilter) {
        child += '[data-state="' + stateFilter + '"]';
      } else {
        child += ":not([data-state])";
      }
      return sel + " " + child;
    }

    function emojiStyle(emoji) {
      return 'content:' + JSON.stringify(emoji) + ';display:inline-block;font-size:14px;line-height:18px;text-align:center;user-select:none;white-space:nowrap;';
    }

    function imageStyle(uri) {
      return 'content:"";display:inline-block;width:16px;height:16px;background-image:url(' + JSON.stringify(uri) + ');background-size:contain;background-repeat:no-repeat;';
    }

    function itemStyle(item) {
      if (item && typeof item.image === "string" && item.image.length > 0) return imageStyle(item.image);
      return emojiStyle(item && item.emoji ? item.emoji : "");
    }

    function buildCss(config) {
      if (!config.enabled) return "";
      var lines = [];
      var toolKeys = Object.keys(DEFAULT_CONFIG.tools);

      for (var t = 0; t < toolKeys.length; t++) {
        var tool = toolKeys[t];
        var item = config.tools[tool];
        if (!item.enabled) continue;
        var sels = leadingSelectors(tool);

        var hide = [];
        var show = [];
        for (var s = 0; s < sels.length; s++) {
          hide.push(iconSelector(sels[s], null));
          show.push(sels[s] + "::before");
        }
        lines.push(hide.join(",") + "{display:none}");
        lines.push(show.join(",") + "{" + itemStyle(item) + "}");

        var lead = [];
        for (var s2 = 0; s2 < sels.length; s2++) lead.push(sels[s2]);
        if (item && typeof item.image === "string" && item.image.length > 0) {
          lines.push(lead.join(",") + "{width:16px;height:16px;min-width:16px;white-space:nowrap}");
        } else {
          lines.push(lead.join(",") + "{width:auto;min-width:16px;white-space:nowrap}");
        }
      }

      if (config.error && config.error.enabled) {
        var err = config.error;
        for (var t2 = 0; t2 < toolKeys.length; t2++) {
          var tool2 = toolKeys[t2];
          if (!config.tools[tool2].enabled) continue;
          lines.push(errorIconSelectors(tool2).join(",") + "{display:none}");
          lines.push(errorPseudoSelectors(tool2).join(",") + "{" + itemStyle(err) + "}");
        }
      }

      return lines.join("\n");
    }

    function styleTag() {
      return typeof document === "undefined" ? null : document.querySelector("style[data-plugin-css=" + JSON.stringify(TAG_ID) + "]");
    }

    function applyCss() {
      if (typeof document === "undefined") return;
      var tag = styleTag();
      var css = buildCss(loadConfig());
      if (tag === null) {
        tag = document.createElement("style");
        tag.dataset.plugin = "dsh-tool-emoji";
        tag.dataset.pluginCss = TAG_ID;
        tag.textContent = css;
        document.head.appendChild(tag);
      } else {
        tag.textContent = css;
      }
    }

    function ToolRow(props) {
      var tool = props.tool;
      var item = props.item;
      var label = props.label;
      var onToggle = props.onToggle;
      var onEmoji = props.onEmoji;
      var onUpload = props.onUpload;
      var onRemoveImage = props.onRemoveImage;

      return h("div", { className: "dte-tool" },
        h("div", { className: "dte-tool-head" },
          h("span", { className: "dte-tool-name" }, label),
          h("label", { className: "dte-switch" + (item.enabled ? " on" : "") },
            h("input", {
              type: "checkbox",
              checked: item.enabled,
              onChange: onToggle
            }))),
        h("div", { className: "dte-tool-body" },
          h("input", {
            type: "text",
            value: item.emoji || "",
            disabled: !item.enabled || typeof item.image === "string" && item.image.length > 0,
            placeholder: "Emoji",
            onChange: onEmoji
          }),
          h("input", {
            type: "file",
            accept: "image/*",
            disabled: !item.enabled,
            onChange: onUpload
          }),
          typeof item.image === "string" && item.image.length > 0
            ? h("span", { className: "dte-preview" }, h("img", { src: item.image, alt: "" }))
            : null,
          typeof item.image === "string" && item.image.length > 0
            ? h("button", { type: "button", className: "dte-button danger", onClick: onRemoveImage }, "Remove image")
            : null));
    }

    function SettingsPanel() {
      var state = React.useState(loadConfig());
      var config = state[0];
      var setConfig = state[1];
      var noticeState = React.useState("");
      var notice = noticeState[0];
      var setNotice = noticeState[1];

      function commit(next) {
        setConfig(next);
        if (!saveConfig(next)) {
          setNotice("保存失败：localStorage 空间不足或不可用。");
        } else {
          setNotice("已保存，聊天页即时生效。");
          applyCss();
        }
      }

      function updateTool(tool, patch) {
        var next = JSON.parse(JSON.stringify(config));
        if (tool === "error") {
          next.error = Object.assign({}, next.error, patch);
        } else {
          next.tools[tool] = Object.assign({}, next.tools[tool], patch);
        }
        commit(next);
      }

      function resetAll() {
        commit(defaultConfig());
        setNotice("已恢复默认设置。");
      }

      function resetTool(tool) {
        var next = JSON.parse(JSON.stringify(config));
        if (tool === "error") {
          next.error = Object.assign({}, DEFAULT_CONFIG.error);
        } else {
          next.tools[tool] = Object.assign({}, DEFAULT_CONFIG.tools[tool]);
        }
        commit(next);
      }

      function uploadImage(tool, event) {
        var file = event.target.files && event.target.files[0];
        if (!file) return;
        if (!/^image\//.test(file.type)) {
          setNotice("请选择图片文件。");
          return;
        }
        if (file.size > 1024 * 1024) {
          setNotice("图片请控制在 1MB 以内。");
          return;
        }
        var reader = new FileReader();
        reader.onload = function () {
          updateTool(tool, { image: String(reader.result) });
        };
        reader.onerror = function () {
          setNotice("读取图片失败。");
        };
        reader.readAsDataURL(file);
      }

      var toolRows = Object.keys(DEFAULT_CONFIG.tools).map(function (tool) {
        return h(ToolRow, {
          key: tool,
          tool: tool,
          item: config.tools[tool],
          label: TOOL_LABELS[tool],
          onToggle: function () { updateTool(tool, { enabled: !config.tools[tool].enabled }); },
          onEmoji: function (e) { updateTool(tool, { emoji: e.target.value, image: null }); },
          onUpload: function (e) { uploadImage(tool, e); },
          onRemoveImage: function () { updateTool(tool, { image: null }); }
        });
      });

      return h("div", { className: "dte-panel" },
        h("div", { className: "dte-tool" },
          h("div", { className: "dte-tool-head" },
            h("span", { className: "dte-tool-name" }, "Enable plugin"),
            h("label", { className: "dte-switch" + (config.enabled ? " on" : "") },
              h("input", {
                type: "checkbox",
                checked: config.enabled,
                onChange: function () {
                  var next = JSON.parse(JSON.stringify(config));
                  next.enabled = !next.enabled;
                  commit(next);
                }
              }))),
          h("div", { className: "dte-tool-body" },
            h("span", { className: "dte-notice" }, "关闭后所有工具卡片恢复原始图标。"))),
        h("div", { className: "dte-section" }, "Tool icons"),
        toolRows,
        h("div", { className: "dte-section" }, "Error state"),
        h(ToolRow, {
          tool: "error",
          item: config.error,
          label: TOOL_LABELS.error,
          onToggle: function () { updateTool("error", { enabled: !config.error.enabled }); },
          onEmoji: function (e) { updateTool("error", { emoji: e.target.value, image: null }); },
          onUpload: function (e) { uploadImage("error", e); },
          onRemoveImage: function () { updateTool("error", { image: null }); }
        }),
        h("div", { className: "dte-reset" },
          h("button", { type: "button", className: "dte-button", onClick: resetAll }, "Reset all"),
          h("button", { type: "button", className: "dte-button", onClick: function () { resetTool("error"); } }, "Reset error")),
        notice !== "" ? h("div", { className: "dte-notice" }, notice) : null);
    }

    function apply(ctx) {
      injectPanelCss();
      applyCss();

      if (ctx && ctx.slots) {
        ctx.slots.inject("settings.section", () => ctx.slots.register(
          { name: "settings.section", id: "dsh-tool-emoji", order: 25, label: "Tool emoji" },
          SettingsPanel
        ));
      }

      if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
        window.addEventListener("storage", function (event) {
          if (event.key === STORAGE_KEY) applyCss();
        });
      }
    }

    exports.apply = apply;
    exports.inject = ["slots"];
    return module.exports;
  }
});
