# Expo React Native 项目 AI 提示词文件

## 项目概览
这是一个基于 Expo 的 React Native 跨平台应用项目，同时支持 iOS、Android 和 Web 平台。项目采用现代化的技术栈，实现了用户认证系统和响应式 UI 设计。

## 技术栈

### 核心框架
- **React**: 19.0.0
- **React Native**: 0.79.6
- **Expo**: ~53.0.22
- **TypeScript**: ~5.8.3

### 导航
- **expo-router**: ~5.1.5 (文件系统路由)
- **@react-navigation/native**: ^7.1.6
- **@react-navigation/bottom-tabs**: ^7.3.10
- **@react-navigation/elements**: ^2.3.8

### UI & 样式
- **nativewind**: ^4.1.23 (Tailwind CSS for React Native)
- **tailwindcss**: ^3.4.17
- **@expo/vector-icons**: ^14.1.0
- **expo-symbols**: ~0.4.5
- **react-native-reanimated**: ~3.17.4
- **react-native-gesture-handler**: ~2.24.0

### 状态管理
- **zustand**: ^5.0.8 (轻量级状态管理库)

### 后端服务
- **@supabase/supabase-js**: ^2.57.2 (数据库和认证)

### 其他依赖
- **expo-splash-screen**: ~0.30.10
- **expo-status-bar**: ~2.2.3
- **expo-constants**: ~17.1.7
- **expo-font**: ~13.3.2
- **expo-linking**: ~7.1.7
- **expo-system-ui**: ~5.0.11
- **react-native-safe-area-context**: 5.4.0
- **react-native-screens**: ~4.11.1
- **react-native-web**: ~0.20.0
- **react-native-webview**: 13.13.5

## 项目结构

### 主要目录
- **app/**: 包含应用的所有路由和页面组件
  - **(tabs)/**: 底部标签导航相关页面
  - **user/**: 用户认证相关页面（登录、注册）
  - **_layout.tsx**: 根布局文件
- **components/**: 可复用的 UI 组件
  - **ui/**: 特定于 UI 的组件
- **hooks/**: 自定义 React Hooks
- **lib/**: 核心库和工具函数
  - **store/**: Zustand 状态管理
  - **supabase/**: Supabase 客户端配置
- **assets/**: 静态资源（图片、字体等）
- **constants/**: 常量定义（如颜色主题）

### 核心功能模块

#### 1. 用户认证系统
- 登录、注册、登出功能
- 用户状态管理（使用 Zustand）
- 基于 Supabase 的认证服务
- 自定义 `useSupabase` Hook 提供认证状态

#### 2. 路由与导航
- 使用 Expo Router 的文件系统路由
- 根布局配置（`app/_layout.tsx`）
- 底部标签导航（`app/(tabs)/_layout.tsx`）
- 支持类型化路由（`experiments.typedRoutes: true`）

#### 3. 主题系统
- 深色/浅色主题切换
- 基于 `useColorScheme` Hook
- 使用 React Navigation 的 `ThemeProvider`

## 开发规范

### 代码风格和结构
- 编写简洁、技术性强的 TypeScript 代码，提供准确的示例。
- 使用函数式和声明式编程模式；避免使用类。
- 优先考虑迭代和模块化，而非代码重复。
- 使用带有辅助动词的描述性变量名（例如，isLoading, hasError）。
- 文件结构：导出组件、子组件、辅助函数、静态内容、类型定义。
- 遵循 Expo 官方文档设置和配置项目：`https://docs.expo.dev/`

### 命名约定
- 目录使用小写字母加连字符（例如，components/auth-wizard）。
- 组件优先使用命名导出。
- 组件文件使用帕斯卡命名法（如 `UserProfile.tsx`）。
- Hook 文件使用小驼峰命名法并以 `use` 开头（如 `useSupabase.ts`）。

### TypeScript 使用
- 所有代码使用 TypeScript；优先使用接口而非类型别名。
- 避免使用枚举；使用映射替代。
- 使用带有 TypeScript 接口的函数组件。
- 在 TypeScript 中使用严格模式以获得更好的类型安全性。
- 使用 TypeScript (.ts/.tsx) 作为主要开发语言。

### 语法和格式
- 纯函数使用 "function" 关键字。
- 条件语句中避免不必要的花括号；简单语句使用简洁语法。
- 使用声明式 JSX。
- 使用 Prettier 进行一致的代码格式化。
- 使用 ESLint 进行代码质量检查（`expo lint`）。

### UI 和样式
- 常用 UI 模式和布局使用 Expo 的内置组件。
- 使用 Flexbox 和 Expo 的 useWindowDimensions 实现响应式设计，以适应屏幕尺寸调整。
- 使用 Tailwind CSS（通过 nativewind）或 styled-components 进行组件样式设计。
- 使用 Expo 的 useColorScheme 实现深色模式支持。
- 使用 ARIA 角色和原生可访问性属性确保高可访问性（a11y）标准。
- 利用 react-native-reanimated 和 react-native-gesture-handler 实现高性能动画和手势。
- 使用 Tailwind CSS 进行样式管理（通过 nativewind）。

### 安全区域管理
- 使用 react-native-safe-area-context 中的 SafeAreaProvider 全局管理应用中的安全区域。
- 使用 SafeAreaView 包裹顶级组件，以处理 iOS 和 Android 上的缺口、状态栏和其他屏幕内嵌物。
- 对于可滚动内容，使用 SafeAreaScrollView 确保其尊重安全区域边界。
- 避免为安全区域硬编码内边距或外边距；依赖 SafeAreaView 和上下文钩子。

### 性能优化
- 最小化 useState 和 useEffect 的使用；状态管理优先考虑上下文和 reducer。
- 使用 Expo 的 AppLoading 和 SplashScreen 优化应用启动体验。
- 优化图像：在支持的地方使用 WebP 格式，包含尺寸数据，使用 expo-image 实现懒加载。
- 使用 React 的 Suspense 和动态导入实现非关键组件的代码分割和懒加载。
- 使用 React Native 的内置工具和 Expo 的调试功能分析和监控性能。
- 通过适当使用 memo 化组件和 useMemo、useCallback 钩子避免不必要的重渲染。

### 导航
- 使用 react-navigation 进行路由和导航；遵循其关于堆栈、标签和抽屉导航器的最佳实践。
- 利用深度链接和通用链接改善用户参与度和导航流程。
- 使用 expo-router 的动态路由更好地处理导航。
- 使用 Expo Router 进行页面导航和参数传递。

### 状态管理
- 使用 React Context 和 useReducer 管理全局状态。
- 利用 react-query 进行数据获取和缓存；避免过多的 API 调用。
- 对于复杂的状态管理，考虑使用 Zustand 或 Redux Toolkit。
- 使用库（如 expo-linking）处理 URL 搜索参数。
- 使用 Zustand 进行全局状态管理。
- 用户状态存储在 `userStore.ts`。
- 遵循 React Hooks 最佳实践。

### 错误处理和验证
- 使用 Zod 进行运行时验证和错误处理。
- 使用 Sentry 或类似服务实现适当的错误日志记录。
- 优先考虑错误处理和边缘情况：
  - 在函数开头处理错误。
  - 对错误条件使用提前返回，避免深度嵌套的 if 语句。
  - 避免不必要的 else 语句；改用 if-return 模式。
  - 实现全局错误边界以捕获和处理意外错误。
- 使用 expo-error-reporter 记录和报告生产环境中的错误。

### 测试
- 使用 Jest 和 React Native Testing Library 编写单元测试。
- 使用 Detox 为关键用户流程实现集成测试。
- 使用 Expo 的测试工具在不同环境中运行测试。
- 考虑对组件进行快照测试以确保 UI 一致性。

### 安全性
- 清理用户输入以防止 XSS 攻击。
- 使用 react-native-encrypted-storage 安全存储敏感数据。
- 使用 HTTPS 和适当的身份验证确保与 API 的安全通信。
- 使用 Expo 的安全指南保护您的应用：`https://docs.expo.dev/guides/security/`

### 国际化 (i18n)
- 使用 react-native-i18n 或 expo-localization 进行国际化和本地化。
- 支持多种语言和 RTL 布局。
- 确保文本缩放和字体调整以提高可访问性。

## 关键约定
1. 依赖 Expo 的托管工作流程进行简化的开发和部署。
2. 优先考虑移动网络生命力（加载时间、卡顿和响应能力）。
3. 使用 expo-constants 管理环境变量和配置。
4. 使用 expo-permissions 优雅地处理设备权限。
5. 实现 expo-updates 以进行空中（OTA）更新。
6. 遵循 Expo 的最佳实践进行应用部署和发布：`https://docs.expo.dev/distribution/introduction/`
7. 通过在两个平台上进行广泛测试，确保与 iOS 和 Android 的兼容性。
8. 组件化开发，提高代码复用性。

## 配置文件

### app.json
- Expo 应用配置
- 支持 iOS、Android 和 Web 平台
- 包含图标、启动屏和插件配置
- 启用新架构（`newArchEnabled: true`）

### package.json
- 项目依赖和脚本配置
- 开发依赖包括 TypeScript、ESLint、Tailwind CSS 等

### 环境变量
- 使用 `.env` 文件管理环境变量
- 提供 `.env.example` 作为模板

## 开发流程

1. **安装依赖**：`npm install`
2. **启动开发服务器**：`npm start`
3. **针对特定平台**：`npm run android`、`npm run ios` 或 `npm run web`
4. **代码检查**：`npm run lint`

## 特殊说明
- 项目支持响应式设计，适配不同屏幕尺寸
- 集成了 Supabase 作为后端服务，提供数据库和认证功能
- 用户认证状态通过自定义 Hook 和 Zustand 进行管理

## 扩展建议
- 可以添加更多业务功能模块
- 实现更复杂的用户界面交互
- 增加数据持久化和离线功能
- 集成更多第三方服务和API

## API 文档

- 使用 Expo 的官方文档设置和配置项目：`https://docs.expo.dev/`

请参阅 Expo 的文档，了解有关视图、蓝图和扩展最佳实践的详细信息。