import { Tabs } from "expo-router";

export default function AuthLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // hide header
                tabBarActiveTintColor: "#2563eb", // active color (blue-500)
                tabBarInactiveTintColor: "gray",  // inactive color
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 1,
                    borderTopColor: "#e5e7eb",
                },
            }}
        >
            <Tabs.Screen name="login" options={{ title: "Login" }} />
            <Tabs.Screen name="signup" options={{ title: "Signup" }} />
            <Tabs.Screen name="forgot-password" options={{ title: "Forgot" }} />
        </Tabs>
    );
}
