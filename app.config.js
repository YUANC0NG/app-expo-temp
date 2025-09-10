// 从环境变量中获取Supabase配置
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    // 添加额外配置，用于存储环境变量
    extra: {
      // 如果环境变量存在，则使用环境变量，否则为null
      supabaseUrl: SUPABASE_URL || null,
      supabaseKey: SUPABASE_ANON_KEY || null,
      eas: {
        projectId: "your-project-id"
      }
    }
  }
};