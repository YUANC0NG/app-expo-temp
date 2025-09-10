import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

// 定义Hook返回类型
interface UseSupabaseReturn {
  supabase: typeof supabase;
  isConfigured: boolean;
  isLoading: boolean;
  user: any | null;
  error: Error | null;
}

/**
 * 自定义Hook，用于在组件中使用Supabase
 * 
 * 提供:
 * - supabase客户端实例
 * - 配置状态
 * - 加载状态
 * - 当前用户
 * - 错误信息
 */
export function useSupabase(): UseSupabaseReturn {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // 检查Supabase是否已配置
  const isConfigured = isSupabaseConfigured();

  useEffect(() => {
    // 如果Supabase未配置，则不进行任何操作
    if (!isConfigured) {
      setIsLoading(false);
      return;
    }

    // 获取当前用户
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        setUser(data?.user || null);
      } catch (err) {
        console.error('获取用户信息失败:', err);
        setError(err instanceof Error ? err : new Error('获取用户信息失败'));
      } finally {
        setIsLoading(false);
      }
    };

    // 获取初始用户状态
    fetchUser();

    // 监听认证状态变化
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );

    // 清理函数
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [isConfigured]);

  return {
    supabase,
    isConfigured,
    isLoading,
    user,
    error,
  };
}