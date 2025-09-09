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
  // 设置用户信息
  setUser: (user: UserState['user']) => void
  // 清除用户信息
  clearUser: () => void
  // 设置加载状态
  setLoading: (isLoading: boolean) => void
}

// 创建用户信息store
export const useUserStore = create<UserState>((set) => ({
  // 初始状态
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
  },
  isAuthenticated: false,
  isLoading: false,
  
  // 设置用户信息
  setUser: (user) => set((state) => ({ 
    user, 
    isAuthenticated: !!user.id 
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
  }),
  
  // 设置加载状态
  setLoading: (isLoading) => set({ isLoading }),
}))