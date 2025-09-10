import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useUserStore } from '../lib/store/userStore';

export const UserProfile = () => {
  // 从store中获取用户信息和方法
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    isSupabaseConfigured,
    error,
    login,
    logout,
    register,
    initializeUser
  } = useUserStore();

  // 表单状态
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // 初始化用户状态
  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  // 处理登录
  const handleLogin = async () => {
    if (!email || !password) return;
    await login(email, password);
  };

  // 处理注册
  const handleRegister = async () => {
    if (!email || !password || !name) return;
    await register(email, password, name);
  };

  // 处理登出
  const handleLogout = async () => {
    await logout();
  };

  // 切换登录/注册模式
  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <View style={styles.container}>
      {/* Supabase配置状态 */}
      <View style={styles.configStatus}>
        <Text style={styles.configText}>
          Supabase状态: {isSupabaseConfigured ? '已配置' : '未配置'}
        </Text>
      </View>

      {isAuthenticated ? (
        // 已登录状态
        <>
          <Text style={styles.title}>用户信息</Text>
          <View style={styles.userInfo}>
            <Text style={styles.label}>ID: <Text style={styles.value}>{user.id}</Text></Text>
            <Text style={styles.label}>姓名: <Text style={styles.value}>{user.name}</Text></Text>
            <Text style={styles.label}>邮箱: <Text style={styles.value}>{user.email}</Text></Text>
            {user.avatar && (
              <Text style={styles.label}>头像URL: <Text style={styles.value}>{user.avatar}</Text></Text>
            )}
          </View>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Button title="退出登录" onPress={handleLogout} />
          )}
        </>
      ) : (
        // 未登录状态
        <>
          <Text style={styles.title}>{isRegisterMode ? '注册账号' : '用户登录'}</Text>
          
          {/* 错误信息显示 */}
          {error && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}
          
          {/* 登录/注册表单 */}
          <View style={styles.form}>
            {isRegisterMode && (
              <TextInput
                style={styles.input}
                placeholder="姓名"
                value={name}
                onChangeText={setName}
              />
            )}
            
            <TextInput
              style={styles.input}
              placeholder="邮箱"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="密码"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            {isLoading ? (
              <ActivityIndicator size="small" color="#0000ff" style={styles.loader} />
            ) : (
              <Button 
                title={isRegisterMode ? "注册" : "登录"} 
                onPress={isRegisterMode ? handleRegister : handleLogin} 
              />
            )}
            
            <TouchableOpacity onPress={toggleMode} style={styles.toggleButton}>
              <Text style={styles.toggleText}>
                {isRegisterMode ? "已有账号? 去登录" : "没有账号? 去注册"}
              </Text>
            </TouchableOpacity>
          </View>
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
  configStatus: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  configText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  toggleText: {
    color: '#0066cc',
    fontSize: 14,
  },
  loader: {
    marginVertical: 8,
  },
});