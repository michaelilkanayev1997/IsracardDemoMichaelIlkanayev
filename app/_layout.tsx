import { SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { I18nManager, Platform } from "react-native";
import * as SystemUI from "expo-system-ui";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";

import store, { persistor } from "@/store/store";
import Loader from "@/components/Loader";
import useTheme from "@/hooks/useTheme";
import useLanguageSync from "@/hooks/useLanguageSync";

// Hard-disable RTL before any UI mounts
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

SplashScreen.preventAutoHideAsync();

const AppNavigator = () => {
  const { theme, isDark } = useTheme();
  useLanguageSync();

  useEffect(() => {
    // Sync Android root background with theme
    if (Platform.OS === "android") {
      SystemUI.setBackgroundColorAsync(theme.BACKGROUND);
    }
  }, [theme, isDark]);

  const [loaded, error] = useFonts({
    ...Ionicons.font, // preload Ionicons font
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} animated />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="book/[id]"
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
