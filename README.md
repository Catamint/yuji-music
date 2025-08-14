# 雨霁音乐 🎵

## 简介

<div align="center"><img src="https://private-user-images.githubusercontent.com/93304173/477992418-6509f757-1891-4071-9fed-3adf4d6bae63.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTUxNzE5MTQsIm5iZiI6MTc1NTE3MTYxNCwicGF0aCI6Ii85MzMwNDE3My80Nzc5OTI0MTgtNjUwOWY3NTctMTg5MS00MDcxLTlmZWQtM2FkZjRkNmJhZTYzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA4MTQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwODE0VDExNDAxNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY4OWY1ZTk2YzRkZGE5NTEzODA4YTFkYjZjM2U0MGFhZGYwZDA3NWQzYTgxOGViODQwODk2MGI0MmIxOTJjNjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.dhC2sbEnY7w6LT2ehJI77eHm10EDoz9G_HhUL8e-y-8" style="max-width: 480px"  /></div>

基于 Vue 3 + Vite 构建的跨平台音乐播放器，支持网页端与 Android 客户端。

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

### 构建

```bash
npm run build-vite
```

### Android 打包

```bash
npm run build
npx cap sync
npx cap run android
```

## 🙏 致谢

*   NeteaseCloudMusicApi
*   [NeteaseCloudMusicApiEnhanced](https://github.com/NeteaseCloudMusicApiEnhanced/api-enhanced)
*   [capacitor-music-controls-plugin](https://github.com/ingageco/capacitor-music-controls-plugin)
*   [shadcn/vue](https://github.com/shadcn-ui/ui)

## 🧧 License

* [MIT License](https://github.com/Catamint/vue-music?tab=MIT-1-ov-file#readme)