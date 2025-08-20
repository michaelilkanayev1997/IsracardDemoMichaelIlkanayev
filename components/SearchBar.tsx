import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import colors from "@/constants/colors";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClear,
}) => {
  const handleClear = () => {
    onClear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={colors.PRIMARY}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={onSearchChange}
          placeholder="Search applications..."
          placeholderTextColor={colors.TEXT_MUTED}
          returnKeyType="search"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.TEXT_MUTED} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.BACKGROUND,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.SURFACE,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.BORDER,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.TEXT_PRIMARY,
    paddingVertical: 4,
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
