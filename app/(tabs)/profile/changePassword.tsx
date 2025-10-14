import { AppDispatch } from "@/src/store";
import { resetPassword } from "@/src/store/slices/authSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

export default function ChangePassword() {
    const dispatch = useDispatch<AppDispatch>()
    const { token } = useLocalSearchParams<{ token: string }>();
    const [password, setPassword] = useState("");
    const router = useRouter();

    console.log('token from the params', token)
    const handleReset = async () => {
        const newPassword = ''
        const confirmNewPassword = ''
        try {
            const response = await dispatch(resetPassword({ token, newPassword, confirmNewPassword }))
            //   await
            //     Alert.alert("Success", data.message || "Password reset successfully");
            //     router.push("/auth/login"); // redirect after success
        } catch (err: any) {
            Alert.alert("Error", err.message || "Something went wrong");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Enter New Password</Text>
            <TextInput
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10 }}
            />
            <Button title="Reset Password" onPress={handleReset} />
        </View>
    );
}
