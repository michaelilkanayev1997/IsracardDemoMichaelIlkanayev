import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { hapticPress } from "@/utils/HapticFeedback";
import useTheme from "@/hooks/useTheme";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClear,
  placeholder = "Search...",
}) => {
  const { theme } = useTheme();

  const handleClear = () => {
    hapticPress();
    onClear();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.BACKGROUND }]}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.SURFACE, borderColor: theme.BORDER },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={theme.PRIMARY}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.TEXT_PRIMARY }]}
          value={searchTerm}
          onChangeText={onSearchChange}
          placeholder={placeholder}
          placeholderTextColor={theme.TEXT_SECONDARY}
          returnKeyType="search"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons
              name="close-circle"
              size={20}
              color={theme.TEXT_SECONDARY}
            />
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 5,
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
