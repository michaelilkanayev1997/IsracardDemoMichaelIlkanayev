import { FC } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useDispatch } from "react-redux";

import colors from "@/constants/colors";
import useTheme from "@/hooks/useTheme";
import { toggleTheme } from "@/slices/themeSlice";

const SettingsScreen: FC = () => {
  const dispatch = useDispatch();
  const { theme, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.BACKGROUND }]}>
      <View style={styles.settingRow}>
        <Text style={[styles.settingLabel, { color: theme.TEXT_PRIMARY }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDark}
          onValueChange={() => {
            dispatch(toggleTheme());
          }}
          thumbColor={isDark ? theme.PRIMARY : theme.SURFACE}
          trackColor={{ true: theme.PRIMARY_LIGHT, false: theme.BORDER }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    padding: 20,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.TEXT_PRIMARY,
  },
});

export default SettingsScreen;
