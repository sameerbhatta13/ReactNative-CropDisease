import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setUser(true); // change to { id: "123" } if logged in
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
