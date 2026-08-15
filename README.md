<div align="center">

# 🛍️ DSH Plugin Marketplace

**一个为 DeepSeek Harness (DSH) 打造的插件生态入口**

在「设置 → 插件」里直接浏览、预览、一键安装 GitHub 上的 DSH 插件，
启用列表持久化保存，重启不丢失。

[![DSH](https://img.shields.io/badge/DSH-0.1.0--rc.6-4D6BFE?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)](https://github.com/deepseek-ai/deepseek-harness)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-web-8a63d2?style=flat-square)](#)
[![GitHub stars](https://img.shields.io/github/stars/Viveksssss/DeepSeek-harness-marketplace?style=flat-square)](https://github.com/Viveksssss/DeepSeek-harness-marketplace)

</div>

---

## 📖 目录

- [它是什么](#-它是什么)
- [核心特性](#-核心特性)
- [工作原理](#-工作原理)
- [快速开始](#-快速开始)
- [详细使用指南](#-详细使用指南)
  - [方式一：通过本插件市场（推荐）](#方式一通过本插件市场推荐)
  - [方式二：使用 DSH 命令行](#方式二使用-dsh-命令行)
  - [浏览页](#浏览页)
  - [导入仓库](#导入仓库)
  - [已启用列表](#已启用列表)
- [插件识别规则](#-插件识别规则)
- [状态文件](#-状态文件)
- [常见问题](#-常见问题)
- [踩坑与已知限制](#-踩坑与已知限制)
- [开发](#-开发)
- [License](#-license)

---

## 🧭 它是什么

`dsh-plugin-marketplace` 是一个 **DSH web 端插件**，它在 DSH 的网页版「设置 → 插件」区域新增了一个
**「插件市场」** 标签页。

你可以像逛应用商店一样：

1. 🔍 **浏览** GitHub 上带 `topic:dsh-plugin` 标签的仓库；
2. 📖 直接查看仓库的 **README、星标、语言、许可证** 等元信息；
3. ⚡ **一键安装 / 卸载**，自动调用 DSH 官方的插件机制；
4. 💾 已启用的插件列表会 **持久化** 到本地 JSON 文件，重启 DSH 后依然保留。

它本身是「DSH 的插件」，同时又是「DSH 插件的安装器」——是一个典型的生态入口（bootstrap）。

---

## ✨ 核心特性

| 特性 | 说明 |
| --- | --- |
| 🔎 **GitHub 搜索** | 按 `topic:dsh-plugin` / `topic:dsh-theme` / `topic:dsh-skill` 等关键词检索，按星标排序 |
| 📄 **仓库预览** | 拉取仓库描述、星标、fork 数、语言、许可证、topics 与 README（自动截断） |
| ⚡ **一键启用** | 底层调用 `dsh plugin --profile <name> add github:owner/repo`，复用官方安装流程 |
| 🛡️ **安装校验** | 装完后验证插件包入口文件是否存在，缺失则**自动回滚**，避免弄坏 profile 下次无法启动 |
| 💾 **持久化启用列表** | 写入 `~/.dsh/plugin-marketplace.json`，重启不丢失 |
| 🎨 **深度契合主题** | 全部样式使用 DSW 设计令牌（`--dsw-alias-*`），自动适配明暗主题 |
| 🚦 **友好反馈** | 区分错误 / 警告 / 提示三态，网络异常、GitHub 限流都有清晰提示 |

---

## ⚙️ 工作原理

```
 DSH Web UI（设置 → 插件 → 插件市场）
        │  fetch POST /marketplace/*
        ▼
 后端 handler（lib/index.js，通过 ctx.webServer.register 挂载）
        │
        ├── /marketplace/browse   → GitHub Search API 搜仓库
        ├── /marketplace/import   → GitHub Repos API 拉单个仓库 + README
        ├── /marketplace/enable   → 调 dsh plugin add github:owner/repo（pnpm 转发）
        ├── /marketplace/disable  → 调 dsh plugin remove <pkg>
        └── /marketplace/enabled  → 读/写 ~/.dsh/plugin-marketplace.json
        │
        ▼
  dsh plugin（官方 CLI）→ 转发给 pnpm → reconcilePlugins → 写入 profile 的 bundles 层栈
```

> 关键点：本插件 **不重新发明安装逻辑**，而是完全复用 DSH 官方的
> `dsh plugin` 命令（它本质是 pnpm 转发器 + bundle 调和器），
> 只负责「搜索、预览、持久化、安装后校验与回滚」这些官方 CLI 没有的 UI 能力。

---

## 🚀 快速开始

### 前置要求

- ✅ 已安装 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（`dsh` CLI 可用）
- ✅ 已安装 [pnpm](https://pnpm.io/)（`dsh plugin` 内部依赖 pnpm）
- ✅ 能访问 GitHub（含 `api.github.com`）

### 一键安装

把这个仓库作为一个插件安装进你的 **web profile**：

```bash
dsh plugin --profile web add github:Viveksssss/DeepSeek-harness-marketplace
```

然后用 `dsh web` 启动：

```bash
dsh web
```

打开网页版 → 进入 **设置 → 插件**，就能看到新增的 **「插件市场」** 标签页。🎉

---

## 📚 详细使用指南

### 方式一：通过本插件市场（推荐）

装好插件市场之后，日常管理插件就再也不用记命令了：

1. 启动 DSH 网页版：`dsh web`
2. 进入 **「设置」→「插件」**
3. 点击顶部 **「插件市场」** 标签

现在就进入了插件市场，包含三个子页面：

---

#### 🔍 浏览页

**搜索框**：默认值是 `topic:dsh-plugin`，输入任意 GitHub 搜索关键词后回车或点「搜索」。

**快捷标签（chips）**：一键切换热门搜索词：

| 快捷词 | 用途 |
| --- | --- |
| `topic:dsh-plugin` | 搜索打上 `dsh-plugin` 标签的插件 |
| `topic:dsh-theme` | 搜索 DSH 主题 |
| `topic:dsh-skill` | 搜索 DSH 技能 |
| `deepseek-harness` | 搜索含该关键词的仓库 |

**结果卡片**：每个仓库显示 —— 名称（可点开 GitHub）、星标数、描述、语言、许可证、topics，
以及一个 **「启用 / 已启用 · 停用」** 按钮。

- 点 **「启用」** → 开始安装，按钮变为「处理中…」；
- 安装完成后顶部提示「操作已保存：已安装插件，重启 DSH 后生效」；
- 再次点击（此时为「已启用 · 停用」红色按钮）→ 卸载该插件。

**分页**：列表底部有「上一页 / 第 N 页 / 下一页」，每次最多 30 个结果。

---

#### 📥 导入仓库

用于**精确安装**某个已知仓库（浏览搜索不到时很实用）。

在输入框中填入仓库地址，支持以下任意格式：

```text
deepseek-ai/deepseek-harness                  # owner/repo
https://github.com/owner/repo                 # 完整 URL
https://github.com/owner/repo/tree/main       # 带路径的 URL
git@github.com:owner/repo.git                 # SSH 形式（会被归一化）
```

点 **「导入并预览」** 后，卡片会显示：

- 仓库描述、星标、语言、许可证、topics；
- **README 前 6000 字符**（等宽字体滚动框）；
- 默认分支名；
- 「添加并启用」按钮（逻辑同浏览页）。

---

#### 📋 已启用列表

展示所有已启用（且已持久化）的插件。

- 显示每个插件的名称、星标、描述；
- 每个条目的 **「停用」** 按钮会卸载插件；
- 顶部提示：启用列表已持久化到 `~/.dsh/plugin-marketplace.json`。

---

### 方式二：使用 DSH 命令行

插件市场本质上是对官方 CLI 的封装，你也可以完全脱离 UI 使用官方命令：

```bash
# 安装（推荐 github: 协议，git 依赖会执行 prepare 脚本）
dsh plugin --profile web add github:Viveksssss/DeepSeek-harness-marketplace

# 卸载
dsh plugin --profile web remove <pkg-name>

# 查看已安装
dsh plugin --profile web list

# 升级
dsh plugin --profile web update
```

> ⚠️ 注意：DSH / pnpm **不识别** `@owner:repo` 这种写法（那是 npx 的语法）。
> 请使用 `github:owner/repo` 或 `owner/repo`。

---

## 🧩 插件识别规则

一个 GitHub 仓库要能作为 DSH 插件被本市场（以及 `dsh plugin`）正确安装，需要同时具备**两个**条件：

### 1. 声明 `dsh.bundle`（作为 profile bundle 层被加载）

`package.json` 里声明 `dsh.bundle.patch`，指向仓库根目录的 `cordis.patch.yml`：

```jsonc
{
  "name": "dsh-plugin-marketplace",
  "dsh": {
    // 关键：声明自己是 bundle，reconcilePlugins 会据此把它加进 dsh.profile.bundles
    "bundle": {
      "patch": "./cordis.patch.yml"
    }
  }
}
```

仓库根目录同时需要一个 **`cordis.patch.yml`**，把自己 insert 进 Loader 的 entries
（`name` 必须是 `package.json` 的包名；`id` 全局唯一）：

```yaml
- insert:
    - id: plugin-marketplace
      name: dsh-plugin-marketplace
      inject: [webServer, subprocess]   # 仅当 host 半需要这些服务时才写
```

> ⚠️ **没有 `dsh.bundle` 声明**，`dsh plugin add` 会把它当普通依赖安装（不加入 bundle 层），
> 并打印 `declares no dsh.bundle` 警告；**没有 `cordis.patch.yml` 里的 entry**，则不会被
> Loader 加载。两者缺一不可。

### 2. 声明 `dsh.client`（作为浏览器插件被扫描）

如果插件有前端 UI，再声明 `dsh.client`：

```jsonc
{
  "dsh": {
    "bundle": { "patch": "./cordis.patch.yml" },
    "client": {
      "inject": ["@deepseek-ai/dsh-client-runtime"],
      "platform": "web"
    }
  },
  "exports": {
    ".": "./lib/index.js",      // host 半（后端，提供 /marketplace 路由）
    "./client": "./lib/client.js" // browser 半（前端，slot 注入 UI）
  }
}
```

> `client-modules` 扫描 `ctx.loader.entries()`，对每个包读 `dsh.client`，校验
> `platform === "web"` 且存在 `exports["./client"]`，然后 serve `/plugins/<id>/client.js`。

### 3. 入口文件必需真实存在

这是最常见的坑——很多 git 仓库不提交 `lib/` 构建产物，安装时又没跑 `prepare`/`build`，
导致装上后却无法启动。
   - ✅ 方案 A：把构建产物提交进 git；
   - ✅ 方案 B：把 `build` 脚本改成（或加上）`prepare`，因为 pnpm 安装 git 依赖时会执行 `prepare`。

> 本市场在启用插件时会对入口文件做**校验**，缺失会自动回滚并给出具体报错，
> 避免污染 profile 导致下次 `dsh web` 启动失败。

---

## 💾 状态文件

插件市场会把启用状态写入：

```
~/.dsh/plugin-marketplace.json
```

结构大致如下（`DSH_HOME` 环境变量可自定义 DSH 主目录）：

```json
{
  "version": 1,
  "updatedAt": "2025-08-15T12:00:00.000Z",
  "enabled": [
    {
      "full": "owner/repo",
      "owner": "owner",
      "name": "repo",
      "description": "...",
      "htmlUrl": "https://github.com/owner/repo",
      "stars": 123,
      "pkgName": "实际的 npm 包名",
      "enabledAt": "2025-08-15T12:00:00.000Z"
    }
  ]
}
```

- 卸载插件时会读取该文件中记录的 `pkgName`，用真实的 npm 包名来卸载
  （因为 git 依赖装进 profile 后，`dependencies` 里写的是 npm 名，不是 `owner/repo`）；
- 删除这个文件即可重置市场状态（不会卸载已装的插件本体）。

---

## ❓ 常见问题

<details>
<summary><strong>Q：安装后提示「插件缺少入口文件」，怎么办？</strong></summary>

这是最典型的问题：仓库没提交构建产物（`lib/`），安装时也没生成。请**
联系插件作者**，让其要么提交构建产物，要么把 `build` 改为 `prepare`。
本市场已自动回滚，未污染你的 profile。
</details>

<details>
<summary><strong>Q：提示「已触发 GitHub 速率限制」，怎么回事？</strong></summary>

GitHub API 对匿名请求有速率上限（约 60 次/小时）。稍等一段时间再试，或为本机
配置一个 GitHub token 提升额度（本市场当前版本暂未内置 token 注入，后续可扩展）。
</details>

<details>
<summary><strong>Q：装完插件后需要重启吗？</strong></summary>
需要。插件市场安装/卸载后都会提示「重启 DSH 后生效」，因为 DSH 的 bundle 层
在启动时解析。
</details>

<details>
<summary><strong>Q：状态文件删掉后，已装的插件会消失吗？</strong></summary>

不会。状态文件只是市场用于「记住启用了哪些、卸载时用什么 npm 名」的索引。
真正的插件本体在 profile 的 `node_modules` 里，由 DSH 官方机制管理。
</details>

---

## ⚠️ 踩坑与已知限制

1. **入口文件校验是兜底而非万能**：只检查主入口是否存在且非空，无法做深度语法检查。
2. **匿名 GitHub API 限流**：共享 IP 下浏览/导入频繁可能触发限流，属 GitHub 限制。
3. **安装依赖网络**：`dsh plugin add github:...` 走 git + pnpm，网络慢或 `prepare` 脚本
   未在 `pnpm-workspace.yaml` 的 `allowBuilds` 白名单里时可能失败，此时 CLI 会打印
   具体需要放行的 key。
4. **仅支持 web 平台**：本插件 `platform` 声明为 `web`，客户端注入的是
   `@deepseek-ai/dsh-client-runtime`，TUI 等其它 profile 不适用。

---

## 🛠️ 开发

```bash
# 克隆
git clone https://github.com/Viveksssss/DeepSeek-harness-marketplace.git
cd dsh-plugin-marketplace

# 本项目无独立构建步骤（源码即产物，lib/ 已提交）
# 以 git 依赖方式装进本地 profile 调试：
dsh plugin --profile web add github:Viveksssss/DeepSeek-harness-marketplace

# 或者用本地路径：
dsh plugin --profile web add link:$(pwd)
```

### 目录结构

```
.
├── package.json      # 包清单：dsh.bundle（bundle 层）+ dsh.client（浏览器插件）声明
├── cordis.patch.yml  # bundle 补丁：把自己 insert 进 Loader entries
├── LICENSE           # MIT
└── lib
    ├── index.js      # host 半：/marketplace HTTP 路由 + dsh plugin 调用 + 校验/回滚
    └── client.js     # browser 半：设置页 UI（React + DSW 设计令牌）
```

---

## 📄 License

[MIT](./LICENSE) © 2025
