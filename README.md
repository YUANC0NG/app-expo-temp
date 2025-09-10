# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 功能特点

- **Expo Router**: 基于文件的路由系统
- **Zustand**: 轻量级状态管理
- **可选的Supabase集成**: 通过环境变量配置，支持优雅降级
- **TypeScript**: 类型安全的开发体验

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Supabase集成 (可选)

本项目支持可选的Supabase集成。如果您想使用Supabase功能：

1. 复制`.env.example`文件为`.env`：

   ```bash
   cp .env.example .env
   ```

2. 在`.env`文件中填入您的Supabase配置：

   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. 重启应用以加载环境变量

如果您不提供Supabase配置，应用将自动降级为本地状态管理，不会影响应用的正常运行。

## Zustand状态管理

本项目使用Zustand进行状态管理。主要的状态存储在：

- `lib/store/userStore.ts`: 用户信息和认证状态

使用示例：

```tsx
import { useUserStore } from '@/lib/store/userStore';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useUserStore();
  
  // 使用状态和方法...
}
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
