import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import useTheme from "@/hooks/useTheme";

const NoRippleButton = (props: BottomTabBarButtonProps) => {
  const { onPress, style, children } = props;
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const TabLayout = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      // Avoid white flash on tab switch by keeping inactive screens attached (uses more memory)
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        lazy: false,
        tabBarActiveTintColor: theme.PRIMARY,
        tabBarInactiveTintColor: theme.TEXT_MUTED,
        tabBarStyle: {
          backgroundColor: theme.SURFACE,
          borderTopColor: theme.BORDER,
          borderTopWidth: 0.8,
          height: 65 + insets.bottom,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarHideOnKeyboard: true,
        tabBarButton: (props) => <NoRippleButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t("tabs.favorites"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
