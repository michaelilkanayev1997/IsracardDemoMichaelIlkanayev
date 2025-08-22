import { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import useTheme from "@/hooks/useTheme";
import { hapticPress } from "@/utils/HapticFeedback";

interface BackButtonProps {
  title: string;
}

const BackButton: FC<BackButtonProps> = ({ title }) => {
  const { theme, isDark } = useTheme();

  const handleBack = () => {
    hapticPress();
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.BACKGROUND,
          borderBottomWidth: isDark ? 1 : 0,
          borderBottomColor: isDark ? theme.BORDER : "transparent",
        },
      ]}
    >
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color={theme.TEXT_PRIMARY} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.TEXT_PRIMARY }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  backBtn: {
    position: "absolute",
    left: 16,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default BackButton;
