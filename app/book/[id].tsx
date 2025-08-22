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
import useTheme from "@/hooks/useTheme";
import BackButton from "@/components/BackButton";

const BookDetails: FC = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { cachedBooks, favorites, lastFetched } = useSelector(
    (state: RootState) => state.books
  );

  const book = cachedBooks.find((book) => book.index.toString() === id);
  const isFavorite = favorites.includes(Number(id));

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.BACKGROUND }]}
    >
      <BackButton title="Book Details" />

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

          <Text style={[styles.title, { color: theme.TEXT_PRIMARY }]}>
            {book.title}
          </Text>

          {/* Release date */}
          <View style={styles.infoRow}>
            <Ionicons
              name="calendar-outline"
              size={18}
              color={theme.TEXT_SECONDARY}
            />
            <Text style={[styles.infoText, { color: theme.TEXT_SECONDARY }]}>
              {book.releaseDate}
            </Text>
          </View>

          {/* Pages */}
          <View style={styles.infoRow}>
            <Ionicons
              name="book-outline"
              size={18}
              color={theme.TEXT_SECONDARY}
            />
            <Text style={[styles.infoText, { color: theme.TEXT_SECONDARY }]}>
              {book.pages} pages
            </Text>
          </View>

          {/* Description */}
          <Text style={[styles.description, { color: theme.TEXT_PRIMARY }]}>
            {book.description}
          </Text>

          {/* Favorite button */}
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              {
                backgroundColor: isFavorite ? theme.PRIMARY : theme.SURFACE,
                borderColor: theme.PRIMARY,
              },
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
  },
  container: {
    padding: 16,
    paddingTop: 10,
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
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 16,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookDetails;
