import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/constants/colors";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No items found",
  subtitle = "Try adjusting your search or add new items",
  icon = "search-outline",
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={colors.TEXT_MUTED} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.TEXT_PRIMARY,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.TEXT_SECONDARY,
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

export default EmptyState;
