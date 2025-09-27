import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignupScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center px-6 bg-white dark:bg-gray-900">
            <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sign Up</Text>

            <TextInput placeholder="Name" className="border p-3 rounded mb-3 bg-gray-300" />
            <TextInput placeholder="Email" className="border p-3 rounded mb-3 bg-gray-300" />
            <TextInput placeholder="Password" secureTextEntry className="border p-3 rounded mb-3 bg-gray-300" />

            <Pressable className="bg-green-500 py-3 rounded mb-3">
                <Text className="text-center text-white font-semibold">Create Account</Text>
            </Pressable>

            <Pressable onPress={() => router.push("./login")}>
                <Text className="text-center text-blue-500">Already have an account? Login</Text>
            </Pressable>
        </View>
    );
}
