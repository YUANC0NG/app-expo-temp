import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// 定义Supabase配置类型
interface SupabaseConfig {
  url: string | null;
  key: string | null;
  isConfigured: boolean;
}

// 从环境变量中获取Supabase配置
const getSupabaseConfig = (): SupabaseConfig => {
  try {
    // 尝试从环境变量或Constants中获取配置
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 
                        Constants.expoConfig?.extra?.supabaseUrl || 
                        null;
    
    const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 
                        Constants.expoConfig?.extra?.supabaseKey || 
                        null;
    
    // 检查配置是否完整
    const isConfigured = !!supabaseUrl && !!supabaseKey;
    
    return {
      url: supabaseUrl,
      key: supabaseKey,
      isConfigured
    };
  } catch (error) {
    // 如果出现任何错误，返回未配置状态
    console.warn('Supabase配置读取失败，将以未配置状态运行', error);
    return {
      url: null,
      key: null,
      isConfigured: false
    };
  }
};

// 获取配置
const config = getSupabaseConfig();

// 创建客户端（如果配置存在）或返回模拟客户端
const supabase = config.isConfigured && config.url && config.key
  ? createClient(config.url, config.key)
  : createMockClient();

// 创建模拟客户端，当Supabase未配置时使用
function createMockClient() {
  console.info('Supabase未配置，使用模拟客户端');
  
  // 返回一个模拟客户端，所有方法都返回模拟数据
  return {
    auth: {
      getUser: async () => ({ 
        data: { 
          user: null 
        }, 
        error: null 
      }),
      signUp: async (params: any) => ({ 
        data: { 
          user: params?.email ? {
            id: 'mock-id',
            email: params.email,
            user_metadata: {}
          } : null,
          session: {
            access_token: 'mock-token',
            refresh_token: 'mock-refresh-token',
            expires_in: 3600,
            user: {
              id: 'mock-id',
              email: params?.email || null
            }
          }
        }, 
        error: null 
      }),
      signInWithPassword: async (params: any) => ({ 
        data: { 
          user: params?.email ? {
            id: 'mock-id',
            email: params.email,
            user_metadata: {}
          } : null,
          session: {
            access_token: 'mock-token',
            refresh_token: 'mock-refresh-token',
            expires_in: 3600,
            user: {
              id: 'mock-id',
              email: params?.email || null
            }
          }
        }, 
        error: null 
      }),
      signIn: async (params: any) => ({ 
        data: { 
          user: params?.email ? {
            id: 'mock-id',
            email: params.email
          } : null,
          session: {
            access_token: 'mock-token'
          }
        }, 
        error: null 
      }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: (callback: any) => {
        // 立即触发一次回调，模拟初始状态
        setTimeout(() => {
          callback('SIGNED_OUT', null);
        }, 0);
        
        return { 
          data: { 
            subscription: { 
              unsubscribe: () => {} 
            } 
          } 
        };
      },
    },
    from: (table: string) => ({
      select: (columns: string) => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            // 如果是profiles表，返回模拟的用户资料
            if (table === 'profiles' && column === 'id' && value === 'mock-id') {
              return {
                data: {
                  id: 'mock-id',
                  name: '模拟用户',
                  email: 'mock@example.com',
                  avatar_url: null
                },
                error: null
              };
            }
            return { data: null, error: null };
          },
          data: null,
          error: null
        }),
        data: null,
        error: null
      }),
      insert: async (data: any) => {
        console.log(`模拟插入数据到 ${table}:`, data);
        return { 
          data: Array.isArray(data) ? data : [data], 
          error: null 
        };
      },
      update: async (data: any) => ({ 
        data, 
        error: null 
      }),
      delete: async () => ({ 
        data: null, 
        error: null 
      }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        download: async () => ({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
    // 添加其他可能需要的方法...
  };
}

// 导出Supabase客户端和配置状态
export { config, supabase };

// 导出一个辅助函数，用于检查Supabase是否已配置
export const isSupabaseConfigured = (): boolean => config.isConfigured;