import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('提示', '请输入邮箱和密码');
      return;
    }

    setIsLoading(true);
    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('登录成功', '欢迎回来！', [
        { text: '确定', onPress: () => router.back() }
      ]);
    }, 1500);
  };

  const handleRegister = () => {
    router.push('/user/register' as any);
  };

  const handleForgotPassword = () => {
    Alert.alert('忘记密码', '功能开发中...');
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`${platform}登录`, '功能开发中...');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            {/* <Text className="text-lg font-semibold text-gray-800">登录</Text> */}
          </View>

          <View className="px-6 pt-8">
            {/* Logo/Title */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="person" size={40} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-2">欢迎回来</Text>
              <Text className="text-gray-500 text-center">登录您的账户以继续使用</Text>
            </View>

            {/* Login Form */}
            <View className="space-y-4">
              {/* Email Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">邮箱</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="请输入邮箱地址"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">密码</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="请输入密码"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#9CA3AF" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity onPress={handleForgotPassword} className="self-end mt-2">
                <Text className="text-blue-500 text-sm">忘记密码？</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                className={`bg-blue-500 rounded-lg py-4 items-center mt-6 ${
                  isLoading ? 'opacity-70' : ''
                }`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white text-base font-semibold">
                  {isLoading ? '登录中...' : '登录'}
                </Text>
              </TouchableOpacity>

              {/* Register Link */}
              <View className="flex-row justify-center items-center mt-6">
                <Text className="text-gray-500">还没有账户？</Text>
                <TouchableOpacity onPress={handleRegister} className="ml-1">
                  <Text className="text-blue-500 font-medium">立即注册</Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View className="flex-row items-center my-8">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-4 text-gray-500 text-sm">或者</Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Social Login */}
              <View className="space-y-3">
                <TouchableOpacity
                  className="flex-row items-center justify-center bg-gray-50 rounded-lg py-3 border border-gray-200"
                  onPress={() => handleSocialLogin('微信')}
                >
                  <Ionicons name="logo-wechat" size={20} color="#07C160" />
                  <Text className="ml-2 text-gray-700 font-medium">微信登录</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center justify-center bg-gray-50 rounded-lg py-3 border border-gray-200 mt-3"
                  onPress={() => handleSocialLogin('QQ')}
                >
                  <View className="w-5 h-5 bg-blue-500 rounded-full items-center justify-center">
                    <Text className="text-white text-xs font-bold">Q</Text>
                  </View>
                  <Text className="ml-2 text-gray-700 font-medium">QQ登录</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}