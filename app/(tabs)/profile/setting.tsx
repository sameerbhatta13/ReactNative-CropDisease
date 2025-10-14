import { AppDispatch, RootState } from "@/src/store";
import { forgetPassword } from "@/src/store/slices/authSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileSetting() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { profile } = useSelector((state: RootState) => state.profile);


    const handleForgetPassword = async () => {
        if (!profile?.user?.email) {
            Alert.alert("Error", "Email not available.");
            return;
        }
        console.log('!profile?.user?.email', !profile?.user?.email)
        try {
            const response = await dispatch(forgetPassword({ email: profile.user.email })).unwrap();
            console.log('response', response)
            Alert.alert("Success", response.message || "A password reset email has been sent to your email.");
        } catch (error: any) {
            Alert.alert("Error", error.message || "Something went wrong.");
        }

    }
    return (
        <ScrollView className="flex-1 bg-white px-5 py-10">
            {/* Profile Section */}
            <View className="items-center mb-8">
                <Image
                    source={{ uri: `http://192.168.1.68:3000${profile?.avatarUrl}` }}
                    className="w-24 h-24 rounded-full mb-3"
                />
                <Text className="text-xl font-semibold">{profile?.user?.name}</Text>
                <Text className="text-gray-500">{profile?.user?.email}</Text>
            </View>

            {/* Profile Options */}
            <View className="space-y-4">

                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={() => router.push("/profile/profileDetails")}
                >
                    <MaterialIcons name="person" size={24} color="black" />
                    <Text className="ml-3 text-base">Profile Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={() => router.push("/profile/edit")}
                >
                    <MaterialIcons name="edit" size={24} color="black" />
                    <Text className="ml-3 text-base">Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={handleForgetPassword}
                >
                    <MaterialIcons name="lock" size={24} color="black" />
                    <Text className="ml-3 text-base">Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={() => alert("Notifications Settings")}
                >
                    <MaterialIcons name="notifications" size={24} color="black" />
                    <Text className="ml-3 text-base">Notification Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={() => alert("Privacy Policy")}
                >
                    <MaterialIcons name="privacy-tip" size={24} color="black" />
                    <Text className="ml-3 text-base">Privacy Policy</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
