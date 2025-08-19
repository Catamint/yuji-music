# 雨霁音乐 🎵

基于 Vue 3 + Vite 构建的跨平台音乐播放器，支持网页端与 Android 客户端。

<div align="center"><img src="https://raw.githubusercontent.com/Catamint/yuji-music/refs/heads/master/docs/screenshoots/screenshoot-2.png" style="max-width: 480px"  /></div>

## 🔣 功能特性

- 整合 NeteaseCloudMusicApi 和 GDStudio, 接口支持自部署
- 实现平台登录及歌单, 收藏, 推荐, 搜索, 歌词等功能

- **多端支持**
  - 桌面端与移动端自适应布局
  - 支持 Capacitor 打包为 Android 应用
  - 安卓端整合系统媒体通知控制

- **关于音乐平台登录**
  - **Web**：目前支持在登录页填入 cookies
  - **APP**：应用内点击官网登录，自动通过 CookiesManager 获取 cookies

## 🛠 技术栈

- **构建/框架**：vite + Vue 3
- **UI 框架**：TailwindCSS + shadcn/vue
- **图标库**：@vicons/fluent
- **状态管理**：Pinia
- **接口层**：GDStudio + NeteaseCloudMusicApi
- **Android 应用构建**：Capacitor

## 📂 项目结构

```
.
┣ android                         # Android 平台工程  
┣ capacitor-music-controls-plugin # Android 媒体通知插件  
┣ my-cookie-manager               # Android Cookies 插件
┗ src                             # Vue 应用源码
  ┣ assets     # 静态资源
  ┣ components # 组件
  ┣ layout     # 顶层页面及其布局
  ┣ router     # vue-router
  ┣ services   # api services
  ┣ stores     # 状态管理 / 播放控件
  ┗ views      # 子页面
```

## 🚀 本地开发 & 构建

### 开发环境
```bash
npm install
npm run serve-vite
```

### 面向 Github Page 的 PWA 部署

> 默认会把404页面部署到根目录, 可在 `vite.config.js` 中修改 `copy-404` 行为

```bash
# 使用 vite 打包 PWA, 默认根路径为 yuji-music, 可在 .env.pwa 中修改为自己的项目名称
npx vite build --mode pwa
# 使用 gh-pages 将 dist 提交到 gh-pages 分支
npx gh-pages -d dist
```

### Android APP 打包

```bash
npx vite build --mode capacitor
npx cap sync
npx cap run android
```

## 🙏 致谢

*   NeteaseCloudMusicApi
*   [NeteaseCloudMusicApiEnhanced](https://github.com/NeteaseCloudMusicApiEnhanced/api-enhanced)
*   [capacitor-music-controls-plugin](https://github.com/ingageco/capacitor-music-controls-plugin)
*   [shadcn/vue](https://github.com/shadcn-ui/ui)

## 🧧 License

* [MIT License](https://github.com/Catamint/yuji-music?tab=MIT-1-ov-file#readme)