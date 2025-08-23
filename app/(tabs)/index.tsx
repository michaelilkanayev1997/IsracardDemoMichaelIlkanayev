import { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useGetBooksQuery } from "@/slices/booksApiSlice";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import SearchBar from "@/components/SearchBar";
import Header, { ViewModeOptions } from "@/components/Header";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { SortOption } from "@/components/SortMenu";
import { filterBooks, sortBooks } from "@/utils/helper";
import { setCachedBooks } from "@/slices/booksSlice";
import { RootState } from "@/store/store";
import useTheme from "@/hooks/useTheme";
import BooksFlashList from "@/components/BooksFlashList";

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const BooksScreen: FC = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { t } = useTranslation();

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
    [booksToShow, debounced]
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
        placeholder={t("books.searchPlaceholder")}
      />

      {/* Books List */}
      {isLoading ? (
        <Loader message={t("books.loading")} />
      ) : isError ? (
        <ErrorState message={t("books.error")} onRetry={() => refetch()} />
      ) : (
        <BooksFlashList
          books={sortedBooks}
          viewMode={viewMode}
          emptyState={{
            title: t("books.emptyTitle"),
            subtitle: t("books.emptySubtitle"),
            icon: "book-outline",
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BooksScreen;
