import { isSupabaseConfigured, supabase } from '@/lib/supabase/client'
import { create } from 'zustand'

// 定义用户信息的类型
interface UserState {
  // 用户信息
  user: {
    id: string | null
    name: string | null
    email: string | null
    avatar: string | null
  }
  // 认证状态
  isAuthenticated: boolean
  // 加载状态
  isLoading: boolean
  // Supabase配置状态
  isSupabaseConfigured: boolean
  // 错误信息
  error: Error | null
  
  // 设置用户信息
  setUser: (user: UserState['user']) => void
  // 清除用户信息
  clearUser: () => void
  // 设置加载状态
  setLoading: (isLoading: boolean) => void
  // 设置错误信息
  setError: (error: Error | null) => void
  
  // 登录功能
  login: (email: string, password: string) => Promise<void>
  // 注册功能
  register: (email: string, password: string, name: string) => Promise<void>
  // 登出功能
  logout: () => Promise<void>
  // 初始化用户状态
  initializeUser: () => Promise<void>
}

// 创建用户信息store
export const useUserStore = create<UserState>((set, get) => ({
  // 初始状态
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
  },
  isAuthenticated: false,
  isLoading: false,
  isSupabaseConfigured: isSupabaseConfigured(),
  error: null,
  
  // 设置用户信息
  setUser: (user) => set((state) => ({ 
    user, 
    isAuthenticated: !!user.id,
    error: null
  })),
  
  // 清除用户信息
  clearUser: () => set({
    user: {
      id: null,
      name: null,
      email: null,
      avatar: null,
    },
    isAuthenticated: false,
    error: null,
  }),
  
  // 设置加载状态
  setLoading: (isLoading) => set({ isLoading }),
  
  // 设置错误信息
  setError: (error) => set({ error }),
  
  // 登录功能
  login: async (email, password) => {
    const { isSupabaseConfigured } = get();
    set({ isLoading: true, error: null });
    
    try {
      if (isSupabaseConfigured) {
        // 使用Supabase登录
        const response = await supabase.auth.signInWithPassword({
          email,
          password,
        }).catch(err => {
          console.error("登录API调用失败:", err);
          return { data: null, error: err instanceof Error ? err : new Error('登录API调用失败') };
        });
        
        const { data, error } = response;
        
        if (error) throw error;
        
        const user = data?.user;
        
        if (user) {
          try {
            // 获取用户详细信息
            const profileResponse = await supabase
              .from('profiles')
              .select('name, avatar_url')
              .eq('id', user.id)
              .single();
            
            const profileData = profileResponse.data;
            
            set({
              user: {
                id: user.id,
                email: user.email || null,
                name: (profileData?.name as string) || (user.email ? user.email.split('@')[0] : null),
                avatar: (profileData?.avatar_url as string) || null,
              },
              isAuthenticated: true,
            });
          } catch (profileErr) {
            console.warn("获取用户资料失败，使用基本信息:", profileErr);
            set({
              user: {
                id: user.id,
                email: user.email || null,
                name: user.email ? user.email.split('@')[0] : null,
                avatar: null,
              },
              isAuthenticated: true,
            });
          }
        }
      } else {
        // 模拟登录（当Supabase未配置时）
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            set({
              user: {
                id: '1',
                name: email.split('@')[0],
                email: email,
                avatar: null,
              },
              isAuthenticated: true,
            });
            resolve();
          }, 1000);
        });
      }
    } catch (error) {
      console.error('登录失败:', error);
      set({ 
        error: error instanceof Error ? error : new Error('登录失败') 
      });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 注册功能
  register: async (email, password, name) => {
    const { isSupabaseConfigured } = get();
    set({ isLoading: true, error: null });
    
    try {
      if (isSupabaseConfigured) {
        // 使用Supabase注册
        const response = await supabase.auth.signUp({
          email,
          password,
        }).catch(err => {
          console.error("注册API调用失败:", err);
          return { data: null, error: err instanceof Error ? err : new Error('注册API调用失败') };
        });
        
        const { data, error } = response;
        
        if (error) throw error;
        
        const user = data?.user;
        
        if (user) {
          try {
            // 创建用户资料
            const profileResponse = await supabase
              .from('profiles')
              .insert([
                {
                  id: user.id,
                  name,
                  email,
                },
              ]);
            
            if (profileResponse.error) {
              console.warn("创建用户资料失败:", profileResponse.error);
            }
            
            set({
              user: {
                id: user.id,
                name,
                email: user.email || null,
                avatar: null,
              },
              isAuthenticated: true,
            });
          } catch (profileErr) {
            console.warn("创建用户资料失败:", profileErr);
            // 即使资料创建失败，也设置用户为已登录状态
            set({
              user: {
                id: user.id,
                name,
                email: user.email || null,
                avatar: null,
              },
              isAuthenticated: true,
            });
          }
        }
      } else {
        // 模拟注册（当Supabase未配置时）
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            set({
              user: {
                id: '1',
                name,
                email,
                avatar: null,
              },
              isAuthenticated: true,
            });
            resolve();
          }, 1000);
        });
      }
    } catch (error) {
      console.error('注册失败:', error);
      set({ 
        error: error instanceof Error ? error : new Error('注册失败') 
      });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 登出功能
  logout: async () => {
    const { isSupabaseConfigured } = get();
    set({ isLoading: true, error: null });
    
    try {
      if (isSupabaseConfigured) {
        // 使用Supabase登出
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }
      
      // 无论是否使用Supabase，都清除本地用户状态
      get().clearUser();
    } catch (error) {
      console.error('登出失败:', error);
      set({ 
        error: error instanceof Error ? error : new Error('登出失败') 
      });
    } finally {
      set({ isLoading: false });
    }
  },
  
  // 初始化用户状态
  initializeUser: async () => {
    const { isSupabaseConfigured } = get();
    set({ isLoading: true, error: null });
    
    try {
      if (isSupabaseConfigured) {
        try {
          // 获取当前用户
          const response = await supabase.auth.getUser().catch(err => {
            console.warn("获取用户API调用失败:", err);
            return { data: { user: null }, error: null };
          });
          
          const { data, error } = response;
          
          if (error) {
            console.warn("获取用户状态失败:", error);
            return;
          }
          
          const user = data?.user;
          
          if (user) {
            try {
              // 获取用户详细信息
              const profileResponse = await supabase
                .from('profiles')
                .select('name, avatar_url')
                .eq('id', user.id)
                .single();
              
              const profileData = profileResponse.data;
              
              set({
                user: {
                  id: user.id,
                  email: user.email || null,
                  name: (profileData?.name as string) || (user.email ? user.email.split('@')[0] : null),
                  avatar: (profileData?.avatar_url as string) || null,
                },
                isAuthenticated: true,
              });
            } catch (profileErr) {
              console.warn("获取用户资料失败，使用基本信息:", profileErr);
              set({
                user: {
                  id: user.id,
                  email: user.email || null,
                  name: user.email ? user.email.split('@')[0] : null,
                  avatar: null,
                },
                isAuthenticated: true,
              });
            }
          }
        } catch (err) {
          // 初始化失败时只记录日志
          console.error('初始化用户状态失败:', err);
        }
      }
    } catch (error) {
      console.error('初始化用户状态失败:', error);
      // 初始化失败时不设置错误状态，只记录日志
    } finally {
      set({ isLoading: false });
    }
  },
}))