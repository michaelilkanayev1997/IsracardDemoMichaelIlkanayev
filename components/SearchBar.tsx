import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

// import { hapticPress } from "../utils/HapticFeedback";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClear,
}) => {
  const handleClear = () => {
    // hapticPress();
    onClear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#2563EB"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={onSearchChange}
          placeholder="Search applications..."
          placeholderTextColor="#94A3B8"
          returnKeyType="search"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#94A3B8" />
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
    backgroundColor: "#F8FAFC",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1E293B",
    paddingVertical: 4,
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
