import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { hapticPress } from "@/utils/HapticFeedback";
import useTheme from "@/hooks/useTheme";
import colors from "@/constants/colors";

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  active?: boolean;
}

const ActionButton: FC<ActionButtonProps> = ({
  icon,
  label,
  onPress,
  active = false,
}) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => {
        hapticPress();
        onPress();
      }}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: active ? theme.PRIMARY : theme.SURFACE,
          borderColor: theme.PRIMARY,
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={active ? colors.TEXT_INVERSE : theme.PRIMARY}
      />
      <Text
        style={[
          styles.label,
          { color: active ? colors.TEXT_INVERSE : theme.PRIMARY },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ActionButton;
