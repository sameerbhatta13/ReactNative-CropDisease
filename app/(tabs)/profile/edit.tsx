import { AppDispatch, RootState } from "@/src/store";
import { createProfile, getProfile } from "@/src/store/slices/profileSlice";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function EditProfile() {
    const user = useSelector((state: RootState) => state.auth.user)
    const { profile } = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    console.log('profile', profile)
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
        if (user) {
            setFormData({
                name: user?.name || "",
                email: user?.email || "",
                dob: "",
                address: "",
                phone: "",
                gender: "male",
                avatarUrl: "",
            });
        }
    }, [user]);

    // Image Picker handler
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

    // Generic change handler
    const handleChange = (field: string) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log("Updated Profile:", formData);
        try {
            const response = await dispatch(createProfile(formData))
            console.log('payload', response)
        } catch (error) {
            console.log('error', error)
        }
    };

    return (
        <ScrollView className="flex-1 bg-white p-5">
            <Text className="text-2xl font-bold mb-6">Edit Profile</Text>

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

            {/* email */}
            <Text className="text-base mb-1">Email</Text>
            <TextInput
                placeholder="Enter your name"
                value={formData.email}
                onChangeText={handleChange("name")}
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
                className="bg-blue-500 p-4 rounded-xl items-center mt-4"
            >
                <Text className="text-white text-lg font-semibold">Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
