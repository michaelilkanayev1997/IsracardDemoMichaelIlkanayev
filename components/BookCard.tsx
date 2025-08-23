import { FC, memo } from "react";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { Book } from "@/types/Book";
import { hapticPress } from "@/utils/HapticFeedback";
import { ViewModeOptions } from "./Header";
import useTheme from "@/hooks/useTheme";
import { blurhash } from "@/constants/images";

interface BookCardProps {
  book: Book;
  favorite?: boolean;
  onToggleFavorite?: (book: Book) => void;
  viewMode?: ViewModeOptions;
}

const BookCard: FC<BookCardProps> = memo(
  ({ book, favorite, onToggleFavorite, viewMode = "list" }) => {
    const { theme } = useTheme();
    const isGrid = viewMode === "grid";
    return (
      <Animated.View
        entering={FadeInDown.duration(350)}
        exiting={FadeOut.duration(280)}
        style={[
          styles.card,
          { backgroundColor: theme.SURFACE, shadowColor: theme.TEXT_PRIMARY },
          isGrid && styles.cardGrid,
        ]}
      >
        <Image
          source={book.cover}
          style={[styles.image, isGrid && styles.imageGrid]}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={800} // fade-in
          cachePolicy="disk"
        />

        <View style={[styles.info, isGrid && styles.infoGrid]}>
          <Text
            style={[
              styles.title,
              { color: theme.TEXT_PRIMARY },
              isGrid && styles.titleGrid,
            ]}
            numberOfLines={2}
          >
            {book.title}
          </Text>
          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={theme.TEXT_SECONDARY}
            />
            <Text
              style={[
                styles.release,
                { color: theme.TEXT_SECONDARY },
                isGrid && styles.releaseGrid,
              ]}
            >
              {book.releaseDate}
            </Text>
          </View>
        </View>

        {favorite && onToggleFavorite && (
          <Pressable
            onPress={() => {
              hapticPress();
              onToggleFavorite(book);
            }}
            android_ripple={{ color: theme.BORDER, borderless: true }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={({ pressed }) => [
              styles.iconBtn,
              {
                backgroundColor: theme.BACKGROUND,
                borderColor: theme.BORDER,
              },
              pressed && styles.iconBtnPressed,
              isGrid && styles.iconBtnGrid,
            ]}
          >
            <Ionicons name="heart" size={18} color={theme.PRIMARY} />
          </Pressable>
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    alignItems: "center",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardGrid: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 10,
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
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  release: {
    fontSize: 14,
    marginLeft: 6,
  },
  releaseGrid: {
    fontSize: 12,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  iconBtnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  iconBtnGrid: {
    padding: 6,
    borderRadius: 6,
    right: 8,
    bottom: 8,
  },
  imageGrid: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 0,
  },
  infoGrid: {
    marginLeft: 0,
    marginTop: 4,
    width: "100%",
  },
  titleGrid: {
    fontSize: 12,
    textAlign: "left",
  },
});

export default BookCard;
