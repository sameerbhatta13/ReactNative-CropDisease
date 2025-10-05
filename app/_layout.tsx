import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../src/store"; // adjust path
import "./global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    setTimeout(() => {
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
        {token ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
        {/* <Stack.Screen name="(auth)" /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
