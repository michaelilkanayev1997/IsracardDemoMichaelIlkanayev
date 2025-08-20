import { FC } from "react";
import { FlashList } from "@shopify/flash-list";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useGetBooksQuery } from "@/slices/booksApiSlice";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";

const BooksScreen: FC = () => {
  const { data, isLoading, isError, refetch } = useGetBooksQuery();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {isLoading ? (
        <Loader message="Loading books..." />
      ) : isError ? (
        <ErrorState message="Failed to load books" onRetry={() => refetch()} />
      ) : (
        <FlashList
          data={data}
          keyExtractor={(item) => item.index.toString()}
          estimatedItemSize={140}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.cover }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.dateRow}>
                  <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                  <Text style={styles.release}>{item.releaseDate}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: "#111827",
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  release: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
});

export default BooksScreen;
