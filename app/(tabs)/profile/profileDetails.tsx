import { AppDispatch, RootState } from "@/src/store";
import { getProfile } from "@/src/store/slices/profileSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileDetails() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { profile } = useSelector((state: RootState) => state.profile);

    if (!profile) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-gray-500 text-lg">No profile data found</Text>
            </View>
        );
    }

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    };

    const timeAgo = (dateString: string) => {
        if (!dateString) return "";
        const now = new Date();
        const updated = new Date(dateString);
        const diff = Math.floor((now.getTime() - updated.getTime()) / 1000); // in seconds

        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    };

    return (
        <ScrollView className="flex-1 bg-gray-50">
            {/* Profile Header Card */}
            <View className="bg-white rounded-3xl shadow-lg mx-4 my-6 p-6 items-center relative">
                <Image
                    source={{ uri: `http://192.168.1.68:3000${profile?.avatarUrl}` }}
                    className="w-28 h-28 rounded-full mb-4 border-2 border-green-500"
                />
                <Text className="text-2xl font-semibold text-gray-900">
                    {profile?.user?.name}
                </Text>
                <Text className="text-gray-500 mb-2">{profile?.user?.email}</Text>
                <View className="bg-green-100 px-4 py-1 rounded-full">
                    <Text className="text-green-800 text-sm font-medium capitalize">
                        {profile.gender}
                    </Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    className="absolute right-4 top-4 bg-blue-500 p-3 rounded-full shadow-lg"
                    onPress={() => router.push("/profile/edit")}
                >
                    <MaterialIcons name="manage-accounts" size={20} color="white" />

                </TouchableOpacity>
            </View>

            {/* Details Card */}
            <View className="bg-white rounded-3xl shadow-md mx-4 mb-8 p-6 space-y-5">
                <View className="flex-row items-center">
                    <MaterialIcons name="calendar-today" size={22} color="#4B5563" />
                    <Text className="ml-3 text-gray-700 text-base">{formatDate(profile.dob)}</Text>
                </View>

                <View className="flex-row items-center">
                    <MaterialIcons name="phone" size={22} color="#4B5563" />
                    <Text className="ml-3 text-gray-700 text-base">{profile.phone || "N/A"}</Text>
                </View>

                <View className="flex-row items-center">
                    <MaterialIcons name="home" size={22} color="#4B5563" />
                    <Text className="ml-3 text-gray-700 text-base">{profile.address || "Not provided"}</Text>
                </View>

                <View className="flex-row items-center">
                    <MaterialIcons name="access-time" size={22} color="#4B5563" />
                    <Text className="ml-3 text-gray-700 text-base">
                        Joined {new Date(profile.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <View className="items-center mb-6">
                <Text className="text-gray-400 text-sm">
                    Last updated {timeAgo(profile.updatedAt)}
                </Text>
            </View>
        </ScrollView>
    );
}
