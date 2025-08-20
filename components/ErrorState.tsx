import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: FC<ErrorStateProps> = ({
  message = "Something went wrong",
  onRetry,
}) => {
  return (
    <View style={styles.center}>
      <Ionicons name="alert-circle" size={32} color="red" />
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryBtn}>
          <Text style={styles.retryText}>Retry</Text>
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
    color: "red",
  },
  retryBtn: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ErrorState;
