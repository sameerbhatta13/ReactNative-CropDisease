import { AppDispatch, RootState } from "@/src/store";
import { createProfile, getProfile, updateProfile } from "@/src/store/slices/profileSlice";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function EditProfile() {
    const user = useSelector((state: RootState) => state.auth.user);
    const { profile } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dob: "",
        address: "",
        phone: "",
        gender: "male",
        avatarUrl: "",
    });

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: profile?.user?.name || user?.name || "",
                email: profile?.user?.email || user?.email || "",
                dob: profile?.dob ? profile.dob.split("T")[0] : "",
                address: profile?.address || "",
                phone: profile?.phone || "",
                gender: profile?.gender || "male",
                avatarUrl: profile?.avatarUrl || "",
            });
        }
    }, [profile]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            setFormData((prev) => ({
                ...prev,
                avatarUrl: result.assets[0].uri,
            }));
        }
    };

    const handleChange = (field: string) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const form = new FormData();
            form.append("dob", formData.dob);
            form.append("address", formData.address);
            form.append("phone", formData.phone);
            form.append("gender", formData.gender);

            if (formData.avatarUrl && !formData.avatarUrl.startsWith("http")) {
                form.append("avatarUrl", {
                    uri: formData.avatarUrl,
                    type: "image/jpeg",
                    name: "avatar.jpg",
                } as any);
            }

            let response;
            if (profile && profile._id) {
                response = await dispatch(updateProfile(form)).unwrap();
                console.log("Profile updated:", response);
            } else {
                response = await dispatch(createProfile(form)).unwrap();
                console.log("Profile created:", response);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            keyboardVerticalOffset={100}
        >
            <ScrollView className="flex-1 bg-white p-5">
                <Text className="text-2xl font-bold mb-6">
                    {profile ? "Update Profile" : "Edit Profile"}
                </Text>

                {/* Avatar */}
                <TouchableOpacity className="items-center mb-6" onPress={pickImage}>
                    {formData.avatarUrl ? (
                        <Image
                            source={{ uri: formData.avatarUrl }}
                            className="w-24 h-24 rounded-full"
                        />
                    ) : (
                        <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center">
                            <Text className="text-gray-600">Add Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Name */}
                <Text className="text-base mb-1">Name</Text>
                <TextInput
                    placeholder="Enter your name"
                    value={formData.name}
                    onChangeText={handleChange("name")}
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                />

                {/* Email */}
                <Text className="text-base mb-1">Email</Text>
                <TextInput
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={handleChange("email")}
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                />

                {/* Date of Birth */}
                <Text className="text-base mb-1">Date of Birth</Text>
                <TextInput
                    placeholder="YYYY-MM-DD"
                    value={formData.dob}
                    onChangeText={handleChange("dob")}
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                />

                {/* Address */}
                <Text className="text-base mb-1">Address</Text>
                <TextInput
                    placeholder="Enter your address"
                    value={formData.address}
                    onChangeText={handleChange("address")}
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                />

                {/* Phone */}
                <Text className="text-base mb-1">Phone</Text>
                <TextInput
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChangeText={handleChange("phone")}
                    keyboardType="phone-pad"
                    className="border border-gray-300 rounded-lg p-3 mb-4"
                />

                {/* Gender */}
                <Text className="text-base mb-1">Gender</Text>
                <View className="border p-3 border-gray-300 rounded-lg mb-4">
                    <Picker
                        selectedValue={formData.gender}
                        onValueChange={(val: string) => handleChange("gender")(val)}
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                {/* Save Button */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-blue-500 p-4 rounded-xl items-center my-7"
                >
                    <Text className="text-white text-lg font-semibold">Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
