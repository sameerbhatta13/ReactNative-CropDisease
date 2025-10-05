import { RootState } from "@/src/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
    const router = useRouter()
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <View className="flex-1 bg-white px-5 py-10">
            {/* Profile Header */}
            <View className="items-center mb-8">
                <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                    className="w-24 h-24 rounded-full mb-3"
                />
                <Text className="text-xl font-semibold">{user?.name}</Text>
                <Text className="text-gray-500">{user?.email}</Text>
            </View>

            {/* Settings Options */}
            <View className="space-y-4">
                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={() => router.push("/profile/edit")}
                >
                    <MaterialIcons name="edit" size={24} color="black" />
                    <Text className="ml-3 text-base">Update Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={() => router.push("/profile/setting")}
                >
                    <MaterialIcons name="settings" size={24} color="black" />
                    <Text className="ml-3 text-base">Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center p-4 rounded-2xl bg-gray-100"
                    onPress={() => alert("Logged out")}
                >
                    <MaterialIcons name="logout" size={24} color="red" />
                    <Text className="ml-3 text-base text-red-600">Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
