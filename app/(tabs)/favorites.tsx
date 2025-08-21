import { FC, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useSelector } from "react-redux";

import { useGetBooksQuery } from "@/slices/booksApiSlice";
import { RootState } from "@/store/store";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import BookCard from "@/components/BookCard";
import colors from "@/constants/colors";
import { hapticPress } from "@/utils/HapticFeedback";

const FavoritesScreen: FC = () => {
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const { data: books = [], isLoading, isError, refetch } = useGetBooksQuery();

  const [searchTerm, setSearchTerm] = useState("");

  const favoriteBooks = useMemo(() => {
    if (!books?.length || !favoriteIds.length) return [];
    return books.filter((b) => favoriteIds.includes(b.index));
  }, [books, favoriteIds]);

  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) return favoriteBooks;
    const query = searchTerm.toLowerCase();
    return favoriteBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );
  }, [favoriteBooks, searchTerm]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <Header count={filteredBooks.length} />

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={() => setSearchTerm("")}
        placeholder="Search favorites..."
      />

      {/* Content */}
      {isLoading ? (
        <Loader message="Loading favorites..." />
      ) : isError ? (
        <ErrorState message="Failed to load books" onRetry={() => refetch()} />
      ) : (
        <FlashList
          data={filteredBooks}
          keyExtractor={(item) => item.index.toString()}
          estimatedItemSize={140}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title={favoriteIds.length ? "No matches" : "No favorites yet"}
              subtitle={
                favoriteIds.length
                  ? "Try a different search."
                  : "Mark books as favorites to see them here."
              }
              icon="heart-outline"
            />
          }
          renderItem={({ item }) => (
            <Link href={`/book/${item.index}`} asChild>
              <TouchableOpacity activeOpacity={0.7} onPress={hapticPress}>
                <BookCard book={item} />
              </TouchableOpacity>
            </Link>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  listContent: {
    padding: 16,
  },
});

export default FavoritesScreen;
