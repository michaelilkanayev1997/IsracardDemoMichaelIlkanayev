import { FC } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useDispatch } from "react-redux";

import useTheme from "@/hooks/useTheme";
import { toggleTheme } from "@/slices/themeSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";

const SettingsScreen: FC = () => {
  const dispatch = useDispatch();
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.BACKGROUND }]}
    >
      <BackButton title="Book Details" />

      <View style={[styles.settingRow, { borderBottomColor: theme.BORDER }]}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
