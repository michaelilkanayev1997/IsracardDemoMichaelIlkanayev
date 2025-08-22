import { FC, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import Header, { ViewModeOptions } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";
import BookCard from "@/components/BookCard";
import { hapticPress } from "@/utils/HapticFeedback";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { toggleFavorite } from "@/slices/booksSlice";
import { filterBooks, sortBooks } from "@/utils/helper";
import { SortOption } from "@/components/SortMenu";
import useTheme from "@/hooks/useTheme";

const FavoritesScreen: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { favorites, cachedBooks } = useSelector(
    (state: RootState) => state.books
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("title");
  const [viewMode, setViewMode] = useState<ViewModeOptions>("list");
  const debounced = useDebouncedValue(searchTerm, 300);

  const favoriteBooks = useMemo(() => {
    if (!cachedBooks.length || !favorites.length) return [];
    return cachedBooks.filter((book) => favorites.includes(book.index));
  }, [cachedBooks, favorites]);

  // Filtering Books
  const filteredBooks = useMemo(
    () => filterBooks(favoriteBooks, debounced, "title+description"),
    [favoriteBooks, debounced]
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

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClear={() => setSearchTerm("")}
        placeholder="Search favorites..."
      />

      {/* Content */}
      <FlashList
        key={viewMode}
        numColumns={viewMode === "grid" ? 2 : 1}
        data={sortedBooks}
        keyExtractor={(item) => item.index.toString()}
        estimatedItemSize={140}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        //scrollEnabled={sortedBooks.length > 3}
        ListEmptyComponent={
          <EmptyState
            title={favorites.length ? "No matches" : "No favorites yet"}
            subtitle={
              favorites.length
                ? "Try a different search."
                : "Mark books as favorites to see them here."
            }
            icon="heart-outline"
          />
        }
        renderItem={({ item }) => (
          <Link href={`/book/${item.index}`} asChild>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={hapticPress}
              style={viewMode === "grid" && styles.gridItem}
            >
              <BookCard
                book={item}
                favorite={true}
                onToggleFavorite={() => dispatch(toggleFavorite(item.index))}
                viewMode={viewMode}
              />
            </TouchableOpacity>
          </Link>
        )}
      />
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

export default FavoritesScreen;
