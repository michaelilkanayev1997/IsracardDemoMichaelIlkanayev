import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
      <Ionicons name={icon} size={48} color="#94A3B8" />
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
    color: "#1E293B",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

export default EmptyState;
