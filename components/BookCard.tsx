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

interface BookCardProps {
  book: Book;
  favorite?: boolean;
  onToggleFavorite?: (book: Book) => void;
}

const BookCard: FC<BookCardProps> = memo(
  ({ book, favorite, onToggleFavorite }) => {
    return (
      <Animated.View
        entering={FadeInDown.springify().damping(15)}
        exiting={FadeOutUp.duration(250)}
        style={styles.card}
      >
        <Image source={{ uri: book.cover }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={colors.TEXT_SECONDARY}
            />
            <Text style={styles.release}>{book.releaseDate}</Text>
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
});

export default BookCard;
