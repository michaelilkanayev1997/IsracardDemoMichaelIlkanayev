import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/constants/colors";
import { hapticPress } from "@/utils/HapticFeedback";

interface CustomButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() => {
        hapticPress();
        onPress();
      }}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={22} color={colors.TEXT_INVERSE} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.TEXT_INVERSE,
  },
});

export default CustomButton;
