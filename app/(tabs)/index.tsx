import { FC, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { useGetBooksQuery } from "@/slices/booksApiSlice";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import colors from "@/constants/colors";
import BookCard from "@/components/BookCard";
import { hapticPress } from "@/utils/HapticFeedback";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { filterBooks } from "@/utils/helper";
import { setCachedBooks } from "@/slices/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const BooksScreen: FC = () => {
  const dispatch = useDispatch();
  const { cachedBooks, lastFetched } = useSelector(
    (state: RootState) => state.books
  );

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

  const [searchTerm, setSearchTerm] = useState("");

  const debounced = useDebouncedValue(searchTerm, 300);

  // Filtering Books
  const filteredBooks = useMemo(
    () => filterBooks(booksToShow ?? [], debounced),
    [data, debounced]
  );

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

export default BooksScreen;
