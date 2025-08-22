import { FC } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import useTheme from "@/hooks/useTheme";

interface LoaderProps {
  message?: string;
}

const Loader: FC<LoaderProps> = ({ message = "Loading..." }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={theme.PRIMARY_LIGHT} />
      <Text style={[styles.loadingText, { color: theme.TEXT_SECONDARY }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default Loader;
