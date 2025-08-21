import { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { toggleFavorite } from "@/slices/booksSlice";
import colors from "@/constants/colors";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import { hapticPress } from "@/utils/HapticFeedback";
import { RootState } from "@/store/store";

const BookDetails: FC = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();

  const { cachedBooks, favorites, lastFetched } = useSelector(
    (state: RootState) => state.books
  );

  const book = cachedBooks.find((book) => book.index.toString() === id);
  const isFavorite = favorites.includes(Number(id));

  return (
    <SafeAreaView style={styles.screen}>
      {!lastFetched ? (
        <Loader message="Loading book details..." />
      ) : !book ? (
        <ErrorState message="Book not found in cache" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Image source={{ uri: book.cover }} style={styles.cover} />

          <Text style={styles.title}>{book.title}</Text>

          {/* Release date */}
          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={colors.TEXT_MUTED}
            />
            <Text style={styles.infoText}>{book.releaseDate}</Text>
          </View>

          {/* Pages */}
          <View style={styles.infoRow}>
            <Ionicons name="book-outline" size={18} color={colors.TEXT_MUTED} />
            <Text style={styles.infoText}>{book.pages} pages</Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{book.description}</Text>

          {/* Favorite button */}
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              isFavorite && { backgroundColor: colors.PRIMARY },
            ]}
            onPress={() => {
              hapticPress();
              dispatch(toggleFavorite(book.index));
            }}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? colors.TEXT_INVERSE : colors.PRIMARY}
            />
            <Text
              style={[
                styles.favoriteText,
                isFavorite && { color: colors.TEXT_INVERSE },
              ]}
            >
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  container: {
    padding: 16,
    paddingTop: 0,
  },
  cover: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.TEXT_PRIMARY,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.TEXT_MUTED,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 16,
    color: colors.TEXT_PRIMARY,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.SURFACE,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.PRIMARY,
    fontWeight: "600",
  },
});

export default BookDetails;
