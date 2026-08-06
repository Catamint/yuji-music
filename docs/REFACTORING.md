# 重构记录

本文件记录已经通过代码审阅确认的问题，以及推荐的处理顺序。它不是功能需求清单；每完成一项，应补充验证方式和迁移说明。

## 当前架构

- `src/views` 和 `src/layout` 负责页面与应用壳。
- `src/components/ui` 是通用 UI 基础组件，`contents`、`playercontroller`、`public` 是业务组件。
- `src/stores` 管理用户、主题、界面和音乐相关状态。
- `src/services` 负责 HTTP 请求与接口适配，`src/model` 负责领域模型。
- 根目录同时包含 Vite/PWA 前端、Capacitor Android 工程和本地 Capacitor 插件。

## 已确认问题

### P0：稳定性与正确性

- 原 `player2.ts` 是模块级单例，同时管理队列、浏览器音频事件、歌曲 URL 获取和 Android 媒体通知；重复初始化会重复绑定事件，且没有对浏览器音频事件做完整释放。
- `src/services/api.js` 的 `getArtistDetail` 调用不存在的 `api.request`；`getUserSubcount` 引用了未定义的 `params`；`getPlaylistAllTracks` 被重复定义，前一个实现会被覆盖。
- `src/model/Music.ts` 依赖 `songService`，而 `songService.ts` 又导入 `Music`，存在循环依赖。
- `src/main.js` 与 PWA 相关模块都可能注册 Service Worker，需要保留唯一的注册入口。

### P1：可维护性与安全性

- 业务代码混用 JS/TS、Options API/Composition API；状态和数据模型的类型边界不稳定。
- `EntityStore` 是第二套内存缓存，尚未成为统一数据源，缓存失效策略也未被使用。
- Cookie 被持久化到 `localStorage`，应明确其风险、清除策略和原生端存储策略。
- Vite、Capacitor、README 以及依赖列表存在历史遗留配置和未使用依赖，需要在行为稳定后审计。

## 分阶段计划

1. **播放器（进行中）**：把播放器状态迁入 Pinia，隔离音频与原生媒体控件，保证初始化/销毁幂等，并暂时保留旧组件调用入口。
2. **请求与模型**：拆分 API 客户端，修复已知接口问题，以 DTO 映射层消除模型与 service 的循环依赖。
3. **功能分层**：按 `player`、`search`、`library`、`auth` 等业务功能组织页面、组件、状态和请求。
4. **基础设施**：统一 TypeScript 和组件编写方式，补充 lint、单元测试与关键播放流程的端到端验证。
5. **清理**：移除兼容入口、遗留依赖和重复缓存，并收紧登录态存储。

## 播放器迁移约定

- 新代码应使用 `usePlayerStore()`；不直接读写 `HTMLAudioElement`，而通过播放器 action 操作。
- `player2.ts` 暂时只作为兼容层，供尚未迁移的页面使用。
- 原生媒体通知是可选能力：网页端播放不能依赖它成功。
