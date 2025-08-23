import { FC, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "@/store/store";
import Header, { ViewModeOptions } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { toggleFavorite } from "@/slices/booksSlice";
import { filterBooks, sortBooks } from "@/utils/helper";
import { SortOption } from "@/components/SortMenu";
import useTheme from "@/hooks/useTheme";
import BooksFlashList from "@/components/BooksFlashList";

const FavoritesScreen: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { t } = useTranslation();

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
        placeholder={t("favorites.searchPlaceholder")}
      />

      {/* Books List */}
      <BooksFlashList
        books={sortedBooks}
        viewMode={viewMode}
        favorite
        onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        emptyState={{
          title: favorites.length
            ? t("favorites.emptyNoMatchesTitle")
            : t("favorites.emptyNoFavoritesTitle"),
          subtitle: favorites.length
            ? t("favorites.emptyNoMatchesSubtitle")
            : t("favorites.emptyNoFavoritesSubtitle"),
          icon: "heart-outline",
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FavoritesScreen;
