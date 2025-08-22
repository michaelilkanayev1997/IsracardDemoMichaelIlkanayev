import { FC, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { useGetBooksQuery } from "@/slices/booksApiSlice";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import Header, { ViewModeOptions } from "@/components/Header";
import BookCard from "@/components/BookCard";
import { hapticPress } from "@/utils/HapticFeedback";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { SortOption } from "@/components/SortMenu";
import { filterBooks, sortBooks } from "@/utils/helper";
import { setCachedBooks } from "@/slices/booksSlice";
import { RootState } from "@/store/store";
import useTheme from "@/hooks/useTheme";

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const BooksScreen: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { cachedBooks, lastFetched } = useSelector(
    (state: RootState) => state.books
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("title");
  const [viewMode, setViewMode] = useState<ViewModeOptions>("list");
  const debounced = useDebouncedValue(searchTerm, 300);

  const expired = !lastFetched || Date.now() - lastFetched > TWENTY_FOUR_HOURS;

  // only fetch if expired
  const { data, isLoading, isError, refetch } = useGetBooksQuery(undefined, {
    skip: !expired,
  });

  // whenever fresh data arrives, update cache
  useEffect(() => {
    if (data) {
      dispatch(setCachedBooks(data));
    }
  }, [data, dispatch]);

  // prefer cache if exists, else fallback to query data
  const booksToShow = cachedBooks.length ? cachedBooks : data ?? [];

  // Filtering Books
  const filteredBooks = useMemo(
    () => filterBooks(booksToShow, debounced, "title"),
    [data, debounced]
  );

  // Sorting Books
  const sortedBooks = useMemo(
    () => sortBooks(filteredBooks, sortBy),
    [filteredBooks, sortBy]
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.BACKGROUND }]}
      edges={["top", "left", "right"]}
    >
      {/* Header */}
      <Header
        count={sortedBooks.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onToggleView={() => setViewMode(viewMode === "list" ? "grid" : "list")}
      />

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
          key={viewMode}
          numColumns={viewMode === "grid" ? 2 : 1}
          data={sortedBooks}
          keyExtractor={(item) => item.index.toString()}
          estimatedItemSize={140}
          showsVerticalScrollIndicator={false}
          scrollEnabled={sortedBooks.length > 3}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title="No books found"
              subtitle="Try a different search or check back later"
              icon="book-outline"
            />
          }
          renderItem={({ item }) => (
            <Link href={`/book/${item.index}`} asChild>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={hapticPress}
                style={viewMode === "grid" && styles.gridItem}
              >
                <BookCard book={item} viewMode={viewMode} />
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
  },
  listContent: {
    padding: 16,
  },
  gridItem: {
    marginHorizontal: 6,
  },
});

export default BooksScreen;
