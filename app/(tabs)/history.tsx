import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default function history() {
  const historyData = [
    {
      id: "1",
      date: "2025-10-01",
      disease: "Leaf Blight",
      treatment: "Use copper-based fungicide",
      image: "https://via.placeholder.com/100x100.png?text=Leaf1",
    },
    {
      id: "2",
      date: "2025-09-28",
      disease: "Healthy",
      treatment: "No treatment needed",
      image: "https://via.placeholder.com/100x100.png?text=Leaf2",
    },
  ];

  return (
    <View className='flex-1 '>
      <Text className='text-2xl font-bold'>See Your history </Text>

      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>See Your history</Text>
          </View>


        )}
      />

    </View>
  )
}