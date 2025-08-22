import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { hapticPress } from "@/utils/HapticFeedback";
import useTheme from "@/hooks/useTheme";

interface CustomButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ icon, label, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: theme.SURFACE + "20" }]}
      onPress={() => {
        hapticPress();
        onPress();
      }}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={22} color={theme.TEXT_INVERSE} />
      <Text style={[styles.label, { color: theme.TEXT_INVERSE }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: 55,
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
  },
});

export default CustomButton;
