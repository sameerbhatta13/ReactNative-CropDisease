// app/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';


const Index = () => {
    const router = useRouter()
    return (
        <ImageBackground
            source={require('../../assets/images/farmerOne.jpg')} // 👈 Update path if needed
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <View className="flex-1 bg-black/40 px-6 pb-10 justify-end">
                <View className=" p-6 rounded-xl">
                    <Text className="text-2xl text-white ml-3 font-bold mb-4">
                        Welcome to AgriConnect
                    </Text>
                    <TouchableOpacity
                        className="bg-green-600 p-3 rounded-lg font-semibold"
                        onPress={() => router.push('/signup' as any)}
                    >
                        <Text className="text-white text-center font-semibold">
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Index;