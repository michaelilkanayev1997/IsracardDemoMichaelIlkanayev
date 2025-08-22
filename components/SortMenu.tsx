import { FC, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "@/constants/colors";
import { hapticPress } from "@/utils/HapticFeedback";
import CustomButton from "./CustomButton";

export type SortOption = "title" | "pages" | "date";

interface SortMenuProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortMenu: FC<SortMenuProps> = ({ sortBy, onSortChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = (option: SortOption) => {
    hapticPress();
    onSortChange(option);
    setShowMenu(false);
  };

  return (
    <>
      {/* Sort Button */}
      <CustomButton
        icon="funnel-outline"
        label={
          sortBy === "title" ? "Title" : sortBy === "pages" ? "Pages" : "Date"
        }
        onPress={() => setShowMenu(true)}
      />

      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowMenu(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setShowMenu(false)}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>Sort by</Text>

            <View style={styles.options}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  sortBy === "title" && styles.menuItemActive,
                ]}
                onPress={() => handleSelect("title")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    sortBy === "title" && styles.menuItemTextActive,
                  ]}
                >
                  Title (A–Z)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  sortBy === "pages" && styles.menuItemActive,
                ]}
                onPress={() => handleSelect("pages")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    sortBy === "pages" && styles.menuItemTextActive,
                  ]}
                >
                  Pages
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  sortBy === "date" && styles.menuItemActive,
                ]}
                onPress={() => handleSelect("date")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    sortBy === "date" && styles.menuItemTextActive,
                  ]}
                >
                  Release Date
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: colors.SURFACE,
    borderRadius: 14,
    padding: 18,
    width: 240,
    elevation: 6,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.TEXT_PRIMARY,
    marginBottom: 12,
  },
  options: {
    gap: 6,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  menuItemActive: {
    backgroundColor: colors.PRIMARY_LIGHT_TRANSPARENT,
  },
  menuItemText: {
    fontSize: 15,
    color: colors.TEXT_PRIMARY,
  },
  menuItemTextActive: {
    fontWeight: "600",
    color: colors.PRIMARY_DARK,
  },
});

export default SortMenu;
