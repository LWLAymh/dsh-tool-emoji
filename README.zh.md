# dsh-tool-emoji

[English](README.md)

一个 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web 插件：把工具卡片前面的简单图标换成 emoji，同时**保留原工具卡片的全部内容**。

## 当前映射

| 工具 | Emoji |
|---|---|
| `think`（推理行） | 🤔 |
| `read` / `web_fetch` / `grep` / `glob` / `web_search` | 🧐 |
| `pwsh` | 👨‍💻 |
| `edit` / `str_replace_editor` | ☝️🤓 |
| 以上任一卡片出错（error 状态） | 😫 |

## 安装

```sh
# 本地 checkout
dsh plugin --profile web add file:./dsh-tool-emoji

# 或 GitHub
dsh plugin --profile web add git+https://github.com/LWLAymh/dsh-tool-emoji.git
```

然后重启 Web profile：

```sh
dsh --profile web
```

插件不会热更新到已运行的 Web 进程。

卸载：

```sh
dsh plugin --profile web remove dsh-tool-emoji
```

## 实现原理

- 本插件**不注册** `tool.call.toolview`，因此不会接管原始工具卡片。
- 只注入一层全局 CSS：
  - 隐藏内置 SVG 图标；
  - 在同一个 leading cell 上用 `::before` 显示 emoji；
  - 工具卡片的标题、摘要、diff、终端输出、折叠/展开等原有行为全部保留。
- 错误状态仍会保留原卡片，只把 leading 的红色错误点换成 😫。

## 设置 / 自定义

在 DSH 设置页打开 **Tool emoji**，可以不改代码地自定义每个图标：

- 每个工具图标可单独**启用/取消**。
- 顶部有总开关，可一键**关闭整个插件**。
- 输入框里可填写任意**自定义 emoji/文字**。
- 可**上传本地图片**作为工具图标（保存在 `localStorage`，单张限 1MB）。
- 可**移除已上传图片**，回退到文字 emoji。
- 支持**单个恢复默认**和**全部恢复默认**。

设置会立即生效，刷新后仍然保留。

## 与 dsh-edit-guardian 兼容

如果你同时安装了 `dsh-edit-guardian`，它会对 `edit` / `str_replace_editor` / `pwsh` 使用自定义工具行（`.dshg_row`），而不是官方 `DisclosureRow`。

为了让 emoji 也覆盖这些自定义行，需要：

1. 使用带 `data-tool` 属性的 `dsh-edit-guardian`（本地开发版已支持）；
2. 按你安装 `dsh-edit-guardian` 的方式重新安装它，并重新安装本插件；
3. 重启 Web。

如果 `dsh-edit-guardian` 没有向 `.dshg_row` 暴露 `data-tool`，`edit` / `pwsh` 的 emoji 不会生效。

## 自定义

修改 `lib/client.js` 里的 CSS 即可增删工具和 emoji。

例如给 `bash` 也加一个：

```css
[data-variant="bash"] > span:first-child > span:first-child svg:not([data-state]) { display:none; }
[data-variant="bash"] > span:first-child::before { content:"💻"; font-size:14px; line-height:18px; }
```

## 注意

- 选择器基于官方源码中的稳定 data attribute：
  - `data-tool="edit"` / `data-tool="str_replace_editor"` / `data-tool="pwsh"`
  - `data-variant="think"` / `data-variant="search"` / `data-variant="read"`
  - `[data-disclosure-row] > span:first-child`
- 如果后续 DSH 更新改变了这些 DOM 结构，CSS 选择器可能需要同步调整。
- 该插件是 Web profile 专用；TUI/headless 没有 leading icon UI surface。

## License

MIT
