import { router, Stack } from "expo-router";
import { Provider } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import store, { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/components/Loader";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="book/[id]"
            options={{
              headerShown: true,
              animation: "slide_from_right",
              title: "Book Details",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
