import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/constants/colors";
import useTheme from "@/hooks/useTheme";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: FC<ErrorStateProps> = ({
  message = "Something went wrong",
  onRetry,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.center}>
      <Ionicons name="alert-circle" size={32} color={theme.ERROR} />
      <Text style={[styles.errorText, { color: theme.ERROR }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.retryBtn, { backgroundColor: theme.PRIMARY_LIGHT }]}
        >
          <Text style={[styles.retryText, { color: theme.SURFACE }]}>
            Retry
          </Text>
        </TouchableOpacity>
      )}
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
  errorText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  retryBtn: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: colors.SURFACE,
    fontWeight: "600",
  },
});

export default ErrorState;
