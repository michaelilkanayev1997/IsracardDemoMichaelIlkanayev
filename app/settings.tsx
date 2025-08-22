import { FC, useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import useTheme from "@/hooks/useTheme";
import { toggleTheme } from "@/slices/themeSlice";
import BackButton from "@/components/BackButton";
import { RootState } from "@/store/store";
import { setLanguage } from "@/slices/languageSlice";
import OptionModal, { Option } from "@/components/OptionModal";

const languageOptions: Option[] = [
  { label: "English", value: "en" },
  { label: "עברית", value: "he" },
  { label: "Русский", value: "ru" },
];

const SettingsScreen: FC = () => {
  const dispatch = useDispatch();
  const { theme, isDark } = useTheme();

  const { t } = useTranslation();
  const currentLang = useSelector((state: RootState) => state.language.current);
  const [showLangModal, setShowLangModal] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.BACKGROUND }]}
    >
      <BackButton title="Book Details" />

      {/* Dark mode toggle */}
      <View style={[styles.settingRow, { borderBottomColor: theme.BORDER }]}>
        <Text style={[styles.settingLabel, { color: theme.TEXT_PRIMARY }]}>
          {t("settings.darkMode")}
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

      {/* Language button */}
      <View style={[styles.settingRow, { borderBottomColor: theme.BORDER }]}>
        <Text style={[styles.settingLabel, { color: theme.TEXT_PRIMARY }]}>
          {t("settings.language")}
        </Text>

        <TouchableOpacity
          style={[
            styles.langButton,
            {
              backgroundColor: theme.PRIMARY_LIGHT_TRANSPARENT,
              borderColor: theme.BORDER,
            },
          ]}
          onPress={() => setShowLangModal(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.langButtonText, { color: theme.TEXT_PRIMARY }]}>
            {languageOptions.find((o) => o.value === currentLang)?.label}
          </Text>
        </TouchableOpacity>

        <OptionModal
          visible={showLangModal}
          title="Choose Language"
          options={languageOptions}
          selected={currentLang}
          onSelect={(lang) => dispatch(setLanguage(lang as any))}
          onClose={() => setShowLangModal(false)}
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
  langButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  langButtonText: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default SettingsScreen;
