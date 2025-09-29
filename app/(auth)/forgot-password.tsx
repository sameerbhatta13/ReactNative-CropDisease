import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center px-6 bg-white dark:bg-gray-900">
            <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Forgot Password</Text>

            <TextInput placeholder="Email" className="border p-3 rounded mb-3" />

            <Pressable className="bg-yellow-500 py-3 rounded mb-3">
                <Text className="text-center text-white font-semibold">Reset Password</Text>
            </Pressable>

            <Pressable onPress={() => router.push("./login")}>
                <Text className="text-center text-blue-500">Back to Login</Text>
            </Pressable>
        </View>
    );
}
