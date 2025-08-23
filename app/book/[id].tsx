import { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Share,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Image } from "expo-image";

import { toggleFavorite } from "@/slices/booksSlice";
import Loader from "@/components/Loader";
import ErrorState from "@/components/ErrorState";
import { RootState } from "@/store/store";
import useTheme from "@/hooks/useTheme";
import BackButton from "@/components/BackButton";
import ActionButton from "@/components/ActionButton";
import { blurhash } from "@/constants/images";

const BookDetails: FC = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { cachedBooks, favorites, lastFetched } = useSelector(
    (state: RootState) => state.books
  );

  const book = cachedBooks.find((book) => book.index.toString() === id);
  const isFavorite = favorites.includes(Number(id));

  const handleShare = async () => {
    if (!book) return;
    try {
      if (Platform.OS === "ios") {
        await Share.share({
          message: `${book.title}\n\n${book.description}`,
          url: book.cover, // iOS supports URL as attachment
          title: book.title,
        });
      } else {
        // Android ignores url, include cover in message
        await Share.share({
          message: `${book.title}\n\n${book.description}\n\n${book.cover}`,
          title: book.title,
        });
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.BACKGROUND }]}
    >
      <BackButton title={t("bookDetails.title")} />

      {!lastFetched ? (
        <Loader message={t("bookDetails.loading")} />
      ) : !book ? (
        <ErrorState message={t("bookDetails.notFound")} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={book.cover}
            style={styles.cover}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={300} // fade-in
            cachePolicy="disk"
          />

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
              {t("bookDetails.pages", { count: book.pages })}
            </Text>
          </View>

          {/* Description */}
          <Text style={[styles.description, { color: theme.TEXT_PRIMARY }]}>
            {book.description}
          </Text>

          {/* Favorite button */}
          <ActionButton
            icon={isFavorite ? "heart" : "heart-outline"}
            label={
              isFavorite
                ? t("bookDetails.favorited")
                : t("bookDetails.addToFavorites")
            }
            onPress={() => dispatch(toggleFavorite(book.index))}
            active={isFavorite}
          />

          {/* Share button */}
          <ActionButton
            icon="share-outline"
            label={t("bookDetails.share")}
            onPress={handleShare}
          />
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
});

export default BookDetails;
