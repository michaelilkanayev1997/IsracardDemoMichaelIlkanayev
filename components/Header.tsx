import { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

import SortMenu, { SortOption } from "./SortMenu";
import CustomButton from "./CustomButton";
import useTheme from "@/hooks/useTheme";

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
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={[theme.PRIMARY_DARK, theme.PRIMARY_LIGHT]}
      style={styles.headerGradient}
    >
      <SafeAreaView edges={["top", "left", "right"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Animated.View
            style={styles.titleContainer}
            entering={FadeInLeft.delay(50)
              .springify()
              .damping(15)
              .stiffness(120)}
          >
            <Ionicons
              name="book-outline"
              size={28}
              color={theme.TEXT_INVERSE}
            />
            <Text style={[styles.title, { color: theme.TEXT_INVERSE }]}>
              {t("header.title")}
            </Text>
          </Animated.View>

          {/* Count */}
          <Animated.Text
            entering={FadeInLeft.delay(100)
              .springify()
              .damping(15)
              .stiffness(120)}
            style={[styles.subtitle, { color: theme.TEXT_INVERSE_MUTED }]}
          >
            {t("header.count", { count })}
          </Animated.Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.headerActions}>
          <Animated.View
            entering={FadeInRight.delay(10).springify().damping(15)}
          >
            <SortMenu sortBy={sortBy} onSortChange={onSortChange} />
          </Animated.View>

          <Animated.View
            entering={FadeInRight.delay(200).springify().damping(15)}
          >
            <CustomButton
              icon={viewMode === "list" ? "grid-outline" : "list-outline"}
              label={viewMode === "list" ? t("header.grid") : t("header.list")}
              onPress={onToggleView}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInRight.delay(300).springify().damping(15)}
          >
            <CustomButton
              icon="settings-outline"
              label={t("header.settings")}
              onPress={() => router.push("/settings")}
            />
          </Animated.View>
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
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    marginLeft: 38,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default Header;
