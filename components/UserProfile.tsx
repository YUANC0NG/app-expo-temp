import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useUserStore } from '../lib/store/userStore';

export const UserProfile = () => {
  // 从store中获取用户信息和方法
  const { user, isAuthenticated, setUser, clearUser } = useUserStore();

  // 模拟登录
  const handleLogin = () => {
    // 模拟用户数据
    const mockUser = {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };
    
    // 更新用户信息
    setUser(mockUser);
  };

  // 模拟登出
  const handleLogout = () => {
    clearUser();
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Text style={styles.title}>用户信息</Text>
          <View style={styles.userInfo}>
            <Text style={styles.label}>ID: <Text style={styles.value}>{user.id}</Text></Text>
            <Text style={styles.label}>姓名: <Text style={styles.value}>{user.name}</Text></Text>
            <Text style={styles.label}>邮箱: <Text style={styles.value}>{user.email}</Text></Text>
          </View>
          <Button title="退出登录" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text style={styles.title}>未登录</Text>
          <Button title="登录" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontWeight: 'bold',
  },
});