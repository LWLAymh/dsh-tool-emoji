window.__ModuleLoader__.load({
  id: "dsh-tool-emoji",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    // This plugin is intentionally CSS-only. By not registering
    // `tool.call.toolview`, the original tool cards keep all their details;
    // we only hide the built-in leading SVG and show an emoji instead.
    var css = [
      /* ------------------------------------------------------------ */
      /* Hide the built-in leading SVG icons for the mapped tools.     */
      /* We deliberately leave state dots (svg[data-state]) alone so  */
      /* running/stopped markers still render normally.               */
      /* ------------------------------------------------------------ */
      "[data-variant=\"think\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-variant=\"search\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-variant=\"read\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-tool=\"search\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-tool=\"web_search\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-tool=\"read\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-tool=\"web_fetch\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-tool=\"pwsh\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-tool=\"edit\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state]),",
      "[data-tool=\"str_replace_editor\"] [data-disclosure-row] > span:first-child > span:first-child svg:not([data-state])",
      "{display:none}",

      /* ------------------------------------------------------------ */
      /* Show the emoji in the same leading cell.                      */
      /* ------------------------------------------------------------ */
      "[data-variant=\"think\"] [data-disclosure-row] > span:first-child::before,",
      "[data-variant=\"search\"] [data-disclosure-row] > span:first-child::before,",
      "[data-variant=\"read\"] [data-disclosure-row] > span:first-child::before,",
      "[data-tool=\"search\"] [data-disclosure-row] > span:first-child::before,",
      "[data-tool=\"web_search\"] [data-disclosure-row] > span:first-child::before,",
      "[data-tool=\"read\"] [data-disclosure-row] > span:first-child::before,",
      "[data-tool=\"web_fetch\"] [data-disclosure-row] > span:first-child::before,",
      "[data-tool=\"pwsh\"] [data-disclosure-row] > span:first-child::before,",
      "[data-tool=\"edit\"] [data-disclosure-row] > span:first-child::before,",
      "[data-tool=\"str_replace_editor\"] [data-disclosure-row] > span:first-child::before",
      "{content:\"💬\";display:inline-block;font-size:14px;line-height:18px;text-align:center;user-select:none;white-space:nowrap}",

      /* Override the placeholder content with the actual emoji. */
      "[data-variant=\"think\"] [data-disclosure-row] > span:first-child::before{content:\"🤔\"}",
      "[data-variant=\"search\"] [data-disclosure-row] > span:first-child::before{content:\"🧐\"}",
      "[data-variant=\"read\"] [data-disclosure-row] > span:first-child::before{content:\"🧐\"}",
      "[data-tool=\"search\"] [data-disclosure-row] > span:first-child::before{content:\"🧐\"}",
      "[data-tool=\"web_search\"] [data-disclosure-row] > span:first-child::before{content:\"🧐\"}",
      "[data-tool=\"read\"] [data-disclosure-row] > span:first-child::before{content:\"🧐\"}",
      "[data-tool=\"web_fetch\"] [data-disclosure-row] > span:first-child::before{content:\"🧐\"}",
      "[data-tool=\"pwsh\"] [data-disclosure-row] > span:first-child::before{content:\"👨‍💻\"}",
      "[data-tool=\"edit\"] [data-disclosure-row] > span:first-child::before{content:\"☝️🤓\"}",
      "[data-tool=\"str_replace_editor\"] [data-disclosure-row] > span:first-child::before{content:\"☝️🤓\"}",

      /* ------------------------------------------------------------ */
      /* Multi-emoji markers (e.g. ☝️🤓) need enough room and no wrap   */
      /* so they stay side-by-side instead of stacking vertically.     */
      /* ------------------------------------------------------------ */
      "[data-variant=\"think\"] [data-disclosure-row] > span:first-child,",
      "[data-variant=\"search\"] [data-disclosure-row] > span:first-child,",
      "[data-variant=\"read\"] [data-disclosure-row] > span:first-child,",
      "[data-tool=\"search\"] [data-disclosure-row] > span:first-child,",
      "[data-tool=\"web_search\"] [data-disclosure-row] > span:first-child,",
      "[data-tool=\"read\"] [data-disclosure-row] > span:first-child,",
      "[data-tool=\"web_fetch\"] [data-disclosure-row] > span:first-child,",
      "[data-tool=\"pwsh\"] [data-disclosure-row] > span:first-child,",
      "[data-tool=\"edit\"] [data-disclosure-row] > span:first-child,",
      "[data-tool=\"str_replace_editor\"] [data-disclosure-row] > span:first-child",
      "{width:auto;min-width:16px;white-space:nowrap}",

      /* ------------------------------------------------------------ */
      /* If a mapped tool card is in the error state, replace the      */
      /* error dot with 😫 while keeping the rest of the card intact.  */
      /* ------------------------------------------------------------ */
      "[data-tool=\"search\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"],",
      "[data-tool=\"web_search\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"],",
      "[data-tool=\"read\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"],",
      "[data-tool=\"web_fetch\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"],",
      "[data-tool=\"pwsh\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"],",
      "[data-tool=\"edit\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"],",
      "[data-tool=\"str_replace_editor\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"],",
      "[data-variant=\"think\"][data-state=\"error\"] [data-disclosure-row] > span:first-child > span:first-child svg[data-state=\"error\"]",
      "{display:none}",

      "[data-tool=\"search\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",
      "[data-tool=\"web_search\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",
      "[data-tool=\"read\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",
      "[data-tool=\"web_fetch\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",
      "[data-tool=\"pwsh\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",
      "[data-tool=\"edit\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",
      "[data-tool=\"str_replace_editor\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",
      "[data-variant=\"think\"][data-state=\"error\"] [data-disclosure-row] > span:first-child::before{content:\"😫\"}",

      /* ------------------------------------------------------------ */
      /* dsh-edit-guardian compatibility: those rows do not use        */
      /* DisclosureRow, so we target their own .dshg_row/.dshg_leading */
      /* structure after dsh-edit-guardian exposes data-tool.          */
      /* ------------------------------------------------------------ */
      ".dshg_row[data-tool=\"pwsh\"] > .dshg_leading > svg:not([data-state]),",
      ".dshg_row[data-tool=\"edit\"] > .dshg_leading > svg:not([data-state]),",
      ".dshg_row[data-tool=\"str_replace_editor\"] > .dshg_leading > svg:not([data-state])",
      "{display:none}",

      ".dshg_row[data-tool=\"pwsh\"] > .dshg_leading::before,",
      ".dshg_row[data-tool=\"edit\"] > .dshg_leading::before,",
      ".dshg_row[data-tool=\"str_replace_editor\"] > .dshg_leading::before",
      "{content:\"💬\";display:inline-block;font-size:14px;line-height:18px;text-align:center;user-select:none;white-space:nowrap}",

      ".dshg_row[data-tool=\"pwsh\"] > .dshg_leading,",
      ".dshg_row[data-tool=\"edit\"] > .dshg_leading,",
      ".dshg_row[data-tool=\"str_replace_editor\"] > .dshg_leading",
      "{width:auto;min-width:16px;white-space:nowrap}",

      ".dshg_row[data-tool=\"pwsh\"] > .dshg_leading::before{content:\"👨‍💻\"}",
      ".dshg_row[data-tool=\"edit\"] > .dshg_leading::before{content:\"☝️🤓\"}",
      ".dshg_row[data-tool=\"str_replace_editor\"] > .dshg_leading::before{content:\"☝️🤓\"}",

      ".dshg_row[data-tool=\"pwsh\"][data-state=\"error\"] > .dshg_leading > svg[data-state=\"error\"],",
      ".dshg_row[data-tool=\"edit\"][data-state=\"error\"] > .dshg_leading > svg[data-state=\"error\"],",
      ".dshg_row[data-tool=\"str_replace_editor\"][data-state=\"error\"] > .dshg_leading > svg[data-state=\"error\"]",
      "{display:none}",

      ".dshg_row[data-tool=\"pwsh\"][data-state=\"error\"] > .dshg_leading::before{content:\"😫\"}",
      ".dshg_row[data-tool=\"edit\"][data-state=\"error\"] > .dshg_leading::before{content:\"😫\"}",
      ".dshg_row[data-tool=\"str_replace_editor\"][data-state=\"error\"] > .dshg_leading::before{content:\"😫\"}"
    ].join("\n");

    var tagId = "dsh-tool-emoji/tool-icons.module.css";
    if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
      var tag = document.createElement("style");
      tag.dataset.plugin = "dsh-tool-emoji";
      tag.dataset.pluginCss = tagId;
      tag.textContent = css;
      document.head.appendChild(tag);
    }

    function apply(_ctx) {
      // No React slot registration: the CSS above does the icon swap
      // without replacing or disturbing the original tool card.
    }

    exports.apply = apply;
    exports.inject = [];
    return module.exports;
  }
});
