import { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/constants/colors";
import SortMenu, { SortOption } from "./SortMenu";
import CustomButton from "./CustomButton";

export type ViewModeOptions = "list" | "grid";

interface HeaderProps {
  count: number;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  viewMode: ViewModeOptions;
  onToggleView: () => void;
}

const Header: FC<HeaderProps> = ({
  count,
  sortBy,
  onSortChange,
  viewMode,
  onToggleView,
}) => {
  return (
    <LinearGradient
      colors={[colors.PRIMARY_DARK, colors.PRIMARY_LIGHT]}
      style={styles.headerGradient}
    >
      <SafeAreaView edges={["top", "left", "right"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Ionicons
              name="book-outline"
              size={28}
              color={colors.TEXT_INVERSE}
            />
            <Text style={styles.title}>Books</Text>
          </View>
          <Text style={styles.subtitle}>
            {count} book{count !== 1 ? "s" : ""}
          </Text>
        </View>

        <View style={styles.headerActions}>
          <SortMenu sortBy={sortBy} onSortChange={onSortChange} />

          {/* View Toggle Button */}
          <CustomButton
            icon={viewMode === "list" ? "grid-outline" : "list-outline"}
            label={viewMode === "list" ? "Grid" : "List"}
            onPress={onToggleView}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.TEXT_INVERSE,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.TEXT_INVERSE_MUTED,
    marginLeft: 38,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default Header;
