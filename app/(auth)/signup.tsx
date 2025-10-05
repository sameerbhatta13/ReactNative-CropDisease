import { AppDispatch, RootState } from "@/src/store";
import { registerUser } from "@/src/store/slices/authSlice";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export interface FormData {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export default function SignupScreen() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const handleChange = (field: string) => (value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    }

    const handleSubmit = async () => {

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            Alert.alert('All fields are required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        //     Alert.alert('Please enter a valid email');
        //     return;
        // }

        try {
            const response = await dispatch(registerUser(formData));
            if (registerUser.fulfilled.match(response)) {
                Alert.alert("Registration successful");
                // router.push('/home'); // Redirect on success
            }
        } catch (err: any) {
            console.error('Registration failed:', err);
            // Error is already handled in the reducer
        }
    }
    return (
        <View className="flex-1 justify-center px-6 bg-white dark:bg-gray-900">
            <Text className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Sign Up</Text>

            <TextInput placeholder="Full Name"
                value={formData.name}
                onChangeText={handleChange("name")}
                className="border p-3 rounded mb-3 bg-gray-300" />

            <TextInput placeholder="Email"
                value={formData.email}
                onChangeText={handleChange("email")}
                className="border p-3 rounded mb-3 bg-gray-300" />

            <TextInput placeholder="Password"
                value={formData.password}
                onChangeText={handleChange("password")}
                // secureTextEntry
                className="border p-3 rounded mb-3 bg-gray-300" />

            <TextInput placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                // secureTextEntry
                className="border p-3 rounded mb-3 bg-gray-300" />

            <Pressable onPress={handleSubmit}
                disabled={loading}
                className={`py-3 rounded mb-3 ${loading ? 'bg-green-300' : 'bg-green-500'}`}>
                <Text className="text-center text-white font-semibold">Create Account</Text>
            </Pressable>

            <Pressable onPress={() => router.push("./login")}>
                <Text className="text-center text-blue-500">Already have an account? Login</Text>
            </Pressable>
        </View>
    );
}
