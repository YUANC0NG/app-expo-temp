import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      title: '建议反馈',
      icon: 'chatbubble-outline',
      color: 'text-blue-600',
      onPress: () => Alert.alert('建议反馈', '功能开发中...')
    },
    {
      id: 2,
      title: '主题切换',
      icon: 'color-palette-outline',
      color: 'text-purple-600',
      onPress: () => Alert.alert('主题切换', '功能开发中...')
    },
    {
      id: 3,
      title: '分享应用',
      icon: 'share-outline',
      color: 'text-green-600',
      onPress: () => Alert.alert('分享应用', '功能开发中...')
    },
    {
      id: 4,
      title: '设置',
      icon: 'settings-outline',
      color: 'text-gray-600',
      onPress: () => Alert.alert('设置', '功能开发中...')
    },
    {
      id: 5,
      title: '帮助中心',
      icon: 'help-circle-outline',
      color: 'text-orange-600',
      onPress: () => Alert.alert('帮助中心', '功能开发中...')
    },
    {
      id: 6,
      title: '关于我们',
      icon: 'information-circle-outline',
      color: 'text-indigo-600',
      onPress: () => Alert.alert('关于我们', '功能开发中...')
    }
  ];

  const handleLogin = () => {
    router.push('/user/login' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* User Profile Section */}
        <View className="bg-white mx-4 mt-6 rounded-lg shadow-sm">
          <TouchableOpacity 
            className="p-6 flex-row items-center"
            onPress={handleLogin}
          >
            <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mr-4">
              <Ionicons name="person-outline" size={32} color="#9CA3AF" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800 mb-1">未登录</Text>
              <Text className="text-sm text-gray-500">点击登录享受更多功能</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View className="bg-white mx-4 mt-4 rounded-lg shadow-sm">
          <View className="flex-row">
            <View className="flex-1 items-center py-4 border-r border-gray-100">
              <Text className="text-xl font-bold text-gray-800">--</Text>
              <Text className="text-sm text-gray-500 mt-1">收藏</Text>
            </View>
            <View className="flex-1 items-center py-4 border-r border-gray-100">
              <Text className="text-xl font-bold text-gray-800">--</Text>
              <Text className="text-sm text-gray-500 mt-1">关注</Text>
            </View>
            <View className="flex-1 items-center py-4">
              <Text className="text-xl font-bold text-gray-800">--</Text>
              <Text className="text-sm text-gray-500 mt-1">粉丝</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-4 mt-4 rounded-lg shadow-sm">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              className={`flex-row items-center px-4 py-4 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon as any} size={24} color="#6B7280" />
              <Text className="flex-1 ml-3 text-base text-gray-800">{item.title}</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Info */}
        <View className="items-center py-6">
          <Text className="text-sm text-gray-400">版本 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}