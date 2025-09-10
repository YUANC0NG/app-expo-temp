import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const featuredItems = [
    { id: 1, title: '推荐内容 1', description: '这是一个精选推荐', image: '🎯' },
    { id: 2, title: '推荐内容 2', description: '热门话题讨论', image: '🔥' },
    { id: 3, title: '推荐内容 3', description: '最新资讯更新', image: '📰' },
  ];

  const categories = [
    { id: 1, name: '分类一', icon: 'grid-outline', color: 'bg-blue-500' },
    { id: 2, name: '分类二', icon: 'heart-outline', color: 'bg-red-500' },
    { id: 3, name: '分类三', icon: 'star-outline', color: 'bg-yellow-500' },
    { id: 4, name: '分类四', icon: 'bookmark-outline', color: 'bg-green-500' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>


        {/* Categories */}
        {/* <View className="px-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">分类导航</Text>
          <View className="flex-row justify-between">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className="items-center flex-1 mx-1"
              >
                <View className={`w-12 h-12 rounded-full ${category.color} items-center justify-center mb-2`}>
                  <Ionicons name={category.icon as any} size={24} color="white" />
                </View>
                <Text className="text-sm text-gray-600 text-center">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        {/* Featured Content */}
        <View className="px-4 mt-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">精选推荐</Text>
          {featuredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm flex-row items-center"
            >
              <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mr-3">
                <Text className="text-2xl">{item.image}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-gray-800 mb-1">{item.title}</Text>
                <Text className="text-sm text-gray-500">{item.description}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Banner */}
        <View className="px-4 py-6">
          <TouchableOpacity className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6">
            <Text className="text-white text-lg font-bold mb-2">发现更多精彩</Text>
            <Text className="text-white/80 text-sm">探索更多有趣的内容和功能</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}