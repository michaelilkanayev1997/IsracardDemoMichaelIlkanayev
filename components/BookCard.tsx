import { FC, memo } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "@/constants/colors";
import { Book } from "@/types/Book";

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = memo(({ book }) => {
  return (
    <View style={styles.card}>
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
    </View>
  );
});

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
});

export default BookCard;
