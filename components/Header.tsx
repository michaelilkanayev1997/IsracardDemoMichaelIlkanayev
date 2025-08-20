import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  count: number;
}

const Header: FC<HeaderProps> = ({ count }) => {
  return (
    <LinearGradient
      colors={["#1E40AF", "#3B82F6"]}
      style={styles.headerGradient}
    >
      <SafeAreaView edges={["top", "left", "right"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Ionicons name="book-outline" size={28} color="#FFFFFF" />
            <Text style={styles.title}>Books</Text>
          </View>
          <Text style={styles.subtitle}>
            {count} book{count !== 1 ? "s" : ""}
          </Text>
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
    color: "#FFFFFF",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginLeft: 38,
  },
});

export default Header;
