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

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('提示', '请填写所有必填项');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('提示', '两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      Alert.alert('提示', '密码长度至少6位');
      return;
    }

    if (!agreedToTerms) {
      Alert.alert('提示', '请同意用户协议和隐私政策');
      return;
    }

    setIsLoading(true);
    // 模拟注册请求
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('注册成功', '欢迎加入我们！', [
        { text: '确定', onPress: () => router.back() }
      ]);
    }, 1500);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <Text className="text-lg font-semibold text-gray-800">注册</Text>
          </View>

          <View className="px-6 pt-8">
            {/* Logo/Title */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
                <Ionicons name="person-add" size={40} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-2">创建账户</Text>
              <Text className="text-gray-500 text-center">填写信息完成注册</Text>
            </View>

            {/* Register Form */}
            <View>
              {/* Username Input */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">用户名</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <Ionicons name="person-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="请输入用户名"
                    value={formData.username}
                    onChangeText={(value) => updateFormData('username', value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">邮箱</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="请输入邮箱地址"
                    value={formData.email}
                    onChangeText={(value) => updateFormData('email', value)}
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
                    placeholder="请输入密码（至少6位）"
                    value={formData.password}
                    onChangeText={(value) => updateFormData('password', value)}
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

              {/* Confirm Password Input */}
              <View className="mt-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">确认密码</Text>
                <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 ml-3 text-base text-gray-800"
                    placeholder="请再次输入密码"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons 
                      name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color="#9CA3AF" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Terms Agreement */}
              <TouchableOpacity 
                className="flex-row items-center mt-6"
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View className={`w-5 h-5 rounded border-2 items-center justify-center mr-3 ${
                  agreedToTerms ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}>
                  {agreedToTerms && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text className="text-sm text-gray-600 flex-1">
                  我已阅读并同意
                  <Text className="text-blue-500"> 用户协议 </Text>
                  和
                  <Text className="text-blue-500"> 隐私政策</Text>
                </Text>
              </TouchableOpacity>

              {/* Register Button */}
              <TouchableOpacity
                className={`bg-green-500 rounded-lg py-4 items-center mt-6 ${
                  isLoading ? 'opacity-70' : ''
                }`}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text className="text-white text-base font-semibold">
                  {isLoading ? '注册中...' : '注册'}
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View className="flex-row justify-center items-center mt-6 mb-8">
                <Text className="text-gray-500">已有账户？</Text>
                <TouchableOpacity onPress={() => router.back()} className="ml-1">
                  <Text className="text-blue-500 font-medium">立即登录</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}