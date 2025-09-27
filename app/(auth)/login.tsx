import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const router = useRouter();

    const handleLogin = () => {
        // Perform login logic here
        console.log("Login pressed");
    };

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 bg-white dark:bg-gray-900"
        >
            <View className="flex-1 justify-center px-6">
                {/* Heading */}
                <Text className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
                    Welcome Back 👋
                </Text>

                {/* Inputs */}
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#9ca3af"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-4 text-gray-900 dark:text-white"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    className="w-full  border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-6 text-gray-900 dark:text-white"
                />

                {/* Login Button */}
                <Pressable
                    className="w-full bg-blue-600 py-4 rounded-2xl mb-4 shadow-lg"
                    onPress={handleLogin}
                >
                    <Text className="text-center text-white font-semibold text-lg">
                        Login
                    </Text>
                </Pressable>

                {/* Forgot password */}
                <Pressable onPress={() => router.push("./forgot-password")} className="mb-6">
                    <Text className="text-center text-blue-600 font-medium">
                        Forgot password?
                    </Text>
                </Pressable>

                {/* Signup link */}
                <View className="flex-row justify-center">
                    <Text className="text-gray-600 dark:text-gray-300">Don’t have an account? </Text>
                    <Pressable onPress={() => router.push("./signup")}>
                        <Text className="text-blue-600 font-semibold">Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
