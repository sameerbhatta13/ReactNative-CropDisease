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
  // const token = AsyncStorage.getItem("token")
  console.log('token', token)


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


// import { useColorScheme } from "@/hooks/use-color-scheme";
// import { Stack, useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import { ActivityIndicator, View, Alert } from "react-native";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { RootState, store } from "../src/store";
// import { AppDispatch } from "../src/store";
// import { getCurrentUser, logout } from "../src/store/slices/authSlice";
// import "./global.css";

// export default function RootLayout() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// function AppContent() {
//   const colorScheme = useColorScheme();
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [isLoading, setIsLoading] = useState(true);

//   const { token, user } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     const checkAuthAndPassword = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem("token");

//         if (storedToken) {
//           const result = await dispatch(getCurrentUser()).unwrap();

//           // ✅ Check if password was changed on backend
//           if (result?.data?.user?.passwordChanged) {
//             Alert.alert(
//               "Password Changed",
//               "Your password has been updated. Please log in again."
//             );
//             await AsyncStorage.removeItem("token");
//             dispatch(logout());
//             router.replace("/(auth)/login");
//             return;
//           }
//         } else {
//           router.replace("/(auth)/login");
//         }
//       } catch (err) {
//         console.log("Auth check failed:", err);
//         router.replace("/(auth)/login");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthAndPassword();
//   }, []);

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <>
//       <Stack screenOptions={{ headerShown: false }}>
//         {token && !user?.passwordChanged ? (
//           <Stack.Screen name="(tabs)" />
//         ) : (
//           <Stack.Screen name="(auth)" />
//         )}
//       </Stack>
//       <StatusBar style="auto" />
//     </>
//   );
// }

















