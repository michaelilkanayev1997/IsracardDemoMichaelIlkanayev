import { FC, memo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/constants/colors";
import { Book } from "@/types/Book";
import { hapticPress } from "@/utils/HapticFeedback";
import { ViewModeOptions } from "./Header";

interface BookCardProps {
  book: Book;
  favorite?: boolean;
  onToggleFavorite?: (book: Book) => void;
  viewMode?: ViewModeOptions;
}

const BookCard: FC<BookCardProps> = memo(
  ({ book, favorite, onToggleFavorite, viewMode = "list" }) => {
    const isGrid = viewMode === "grid";
    return (
      <Animated.View
        entering={FadeInDown.springify().damping(15)}
        exiting={FadeOutUp.duration(250)}
        style={[styles.card, isGrid && styles.cardGrid]}
      >
        <Image
          source={{ uri: book.cover }}
          style={[styles.image, isGrid && styles.imageGrid]}
        />

        <View style={[styles.info, isGrid && styles.infoGrid]}>
          <Text
            style={[styles.title, isGrid && styles.titleGrid]}
            numberOfLines={2}
          >
            {book.title}
          </Text>
          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={colors.TEXT_SECONDARY}
            />
            <Text style={[styles.release, isGrid && styles.releaseGrid]}>
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
            android_ripple={{ color: colors.BORDER, borderless: true }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={({ pressed }) => [
              styles.iconBtn,
              pressed && styles.iconBtnPressed,
              isGrid && styles.iconBtnGrid,
            ]}
          >
            <Ionicons name="heart" size={18} color={colors.PRIMARY} />
          </Pressable>
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.SURFACE,
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
    color: colors.TEXT_PRIMARY,
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  release: {
    fontSize: 14,
    color: colors.TEXT_SECONDARY,
    marginLeft: 6,
  },
  releaseGrid: {
    fontSize: 12,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.BACKGROUND,
    borderWidth: 1,
    borderColor: colors.BORDER,
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
