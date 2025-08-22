import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { StatusBar } from "expo-status-bar";

import store, { persistor } from "@/store/store";
import Loader from "@/components/Loader";
import useTheme from "@/hooks/useTheme";

const AppNavigator = () => {
  const { isDark } = useTheme();
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
