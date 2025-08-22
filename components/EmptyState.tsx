import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useTheme from "@/hooks/useTheme";

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
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={theme.TEXT_SECONDARY} />
      <Text style={[styles.title, { color: theme.TEXT_PRIMARY }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.TEXT_SECONDARY }]}>
        {subtitle}
      </Text>
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
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

export default EmptyState;
