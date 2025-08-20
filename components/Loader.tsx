import { FC } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import colors from "@/constants/colors";

interface LoaderProps {
  message?: string;
}

const Loader: FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.PRIMARY_LIGHT} />
      <Text style={styles.loadingText}>{message}</Text>
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
    color: colors.TEXT_SECONDARY,
  },
});

export default Loader;
