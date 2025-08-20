import { FC, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetBooksQuery } from "@/slices/booksApiSlice";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import colors from "@/constants/colors";
import BookCard from "@/components/BookCard";

const BooksScreen: FC = () => {
  const { data, isLoading, isError, refetch } = useGetBooksQuery();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    if (!data) return [];
    return data.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <Header count={filteredBooks.length} />

      {/* SearchBar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={() => setSearchTerm("")}
        placeholder="Search books..."
      />

      {/* Main content */}
      {isLoading ? (
        <Loader message="Loading books..." />
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
              title="No books found"
              subtitle="Try a different search or check back later"
              icon="book-outline"
            />
          }
          renderItem={({ item }) => <BookCard book={item} />}
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

export default BooksScreen;
