import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.PRIMARY,
        tabBarInactiveTintColor: theme.TEXT_MUTED,
        tabBarStyle: {
          backgroundColor: theme.SURFACE,
          borderTopColor: theme.BORDER,
          borderTopWidth: 0.8,
        },
        tabBarHideOnKeyboard: true,
        tabBarButton: (props) => <NoRippleButton {...props} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
