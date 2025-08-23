import { FC, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import BookCard from "@/components/BookCard";
import EmptyState from "@/components/EmptyState";
import { Book } from "@/types/Book";
import { hapticPress } from "@/utils/HapticFeedback";
import { ViewModeOptions } from "./Header";

interface BooksFlashListProps {
  books: Book[];
  viewMode: ViewModeOptions;
  emptyState: {
    title?: string;
    subtitle?: string;
    icon?: keyof typeof Ionicons.glyphMap;
  };
  favorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

const BooksFlashList: FC<BooksFlashListProps> = ({
  books,
  viewMode,
  emptyState,
  favorite,
  onToggleFavorite,
}) => {
  const renderItem: ListRenderItem<Book> = useCallback(
    ({ item }) => (
      <Link href={`/book/${item.index}`} asChild>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={hapticPress}
          style={viewMode === "grid" && styles.gridItem}
        >
          <BookCard
            book={item}
            viewMode={viewMode}
            favorite={favorite}
            onToggleFavorite={
              onToggleFavorite ? () => onToggleFavorite(item.index) : undefined
            }
          />
        </TouchableOpacity>
      </Link>
    ),
    [viewMode, favorite, onToggleFavorite]
  );

  return (
    <FlashList
      key={viewMode}
      numColumns={viewMode === "grid" ? 2 : 1}
      data={books}
      keyExtractor={(item) => item.index.toString()}
      estimatedItemSize={viewMode === "grid" ? 200 : 140}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={<EmptyState {...emptyState} />}
      renderItem={renderItem}
      // Prevent unnecessary scroll on short lists
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContent: { padding: 16 },
  gridItem: { marginHorizontal: 6 },
});

export default BooksFlashList;
