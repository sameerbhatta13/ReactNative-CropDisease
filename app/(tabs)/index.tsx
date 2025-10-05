import { RootState } from "@/src/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function HomeScreen() {
  const { user, setUser } = useSelector((state: RootState) => state.auth)
  console.log('setuser', setUser)
  const steps = [
    {
      icon: "camera-alt",
      title: "Upload or capture leaf image",
      description: "Take a photo or select from your gallery to detect diseases."
    },
    {
      icon: "analytics",
      title: "AI analyzes the leaf",
      description: "Our model checks the leaf for possible diseases accurately."
    },
    {
      icon: "check-circle",
      title: "Get results & treatment",
      description: "Receive disease details and expert-recommended treatments."
    }
  ];

  return (
    <SafeAreaProvider>
      <View className="flex-1 p-6">
        {/* Header */}
        <View className="flex-row items-center justify-center mb-6 ">
          <Image
            source={require("@/assets/images/leaves.jpg")}
            className="w-64 h-40"
            contentFit="contain"
          />
        </View>

        {/* Title */}
        <View className="items-center mb-6">
          <Text className="text-sm font-bold">
            Welcome! <Text className="text-xl bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">{user?.name || 'Farmer'}</Text>
          </Text>
        </View>

        <ScrollView>
          <View className="space-y-4">
            {steps.map((step, index) => (
              <View
                key={index}
                className="flex-row items-start bg-gray-700 p-4 rounded-2xl shadow-md"
              >
                <View className="mr-4 mt-1">
                  <View className="bg-green-500 w-10 h-10 rounded-full items-center justify-center">
                    <MaterialIcons name={step.icon as any} size={24} color="white" />
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 dark:text-white">
                    Step {index + 1}: {step.title}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-300 mt-1">
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Tips / Info Cards */}
          <View className="mb-6">
            <Text className="text-2xl font-bold mt-16 mb-4 underline underline-offset-4">
              Tips for Healthy Crops
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="w-48 bg-green-500 dark:bg-green-800 p-4 rounded-xl mr-4">
                <Text className="font-semibold text-white">Water your plants regularly</Text>
              </View>

              <View className="w-48 bg-green-500 dark:bg-green-800 p-4 rounded-xl mr-4">
                <Text className="font-semibold text-white">Check leaves weekly for pests</Text>
              </View>

              <View className="w-48 bg-green-500 dark:bg-green-800 p-4 rounded-xl">
                <Text className="font-semibold text-white">Use organic fertilizers</Text>
              </View>
            </ScrollView>
          </View>

        </ScrollView>

      </View>
    </SafeAreaProvider>
  );
}
