import { FC, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { hapticPress } from "@/utils/HapticFeedback";
import CustomButton from "./CustomButton";
import useTheme from "@/hooks/useTheme";

export type SortOption = "title" | "pages" | "date";

interface SortMenuProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortMenu: FC<SortMenuProps> = ({ sortBy, onSortChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { theme } = useTheme();

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
          <View style={[styles.menu, { backgroundColor: theme.SURFACE }]}>
            <Text style={[styles.menuTitle, { color: theme.TEXT_PRIMARY }]}>
              Sort by
            </Text>

            <View style={styles.options}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  sortBy === "title" && {
                    backgroundColor: theme.PRIMARY_LIGHT_TRANSPARENT,
                  },
                ]}
                onPress={() => handleSelect("title")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    { color: theme.TEXT_PRIMARY },
                    sortBy === "title" && {
                      fontWeight: "600",
                      color: theme.PRIMARY_DARK,
                    },
                  ]}
                >
                  Title (A–Z)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  sortBy === "pages" && {
                    backgroundColor: theme.PRIMARY_LIGHT_TRANSPARENT,
                  },
                ]}
                onPress={() => handleSelect("pages")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    { color: theme.TEXT_PRIMARY },
                    sortBy === "pages" && {
                      fontWeight: "600",
                      color: theme.PRIMARY_DARK,
                    },
                  ]}
                >
                  Pages
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  sortBy === "date" && {
                    backgroundColor: theme.PRIMARY_LIGHT_TRANSPARENT,
                  },
                ]}
                onPress={() => handleSelect("date")}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    { color: theme.TEXT_PRIMARY },
                    sortBy === "date" && {
                      fontWeight: "600",
                      color: theme.PRIMARY_DARK,
                    },
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
  menuItemText: {
    fontSize: 15,
  },
});

export default SortMenu;
