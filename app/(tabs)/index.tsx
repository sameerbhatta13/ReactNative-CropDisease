import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 p-6">
      {/* Header */}
      <View className="flex-row items-center justify-center mb-6">
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          className="w-64 h-40"
          contentFit="contain"
        />
      </View>

      {/* Title */}
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold">
          Welcome!
        </Text>
      </View>

      {/* Step 1 */}
      <View className="mb-4">
        <Text className="text-lg font-semibold ">
          Step 1: Try it
        </Text>
        <Text className="">
          Edit <Text className="font-semibold">app/(tabs)/index.tsx</Text> to see changes.
        </Text>
      </View>

      {/* Step 2 */}
      <View className="mb-4">
        <Text className="text-lg font-semibold ">
          Step 2: Explore
        </Text>
        <Link href="/modal" asChild>
          <Pressable className="bg-blue-500 px-4 py-2 rounded-lg mt-2">
            <Text className="text-white font-medium">Go to Modal</Text>
          </Pressable>
        </Link>
      </View>

      {/* Step 3 */}
      <View>
        <Text className="text-lg font-semibold">
          Step 3: Get a fresh start
        </Text>
        <Text className="">
          Run <Text className="font-semibold">npm run reset-project</Text> to reset your app.
        </Text>
      </View>
    </View>
  );
}
