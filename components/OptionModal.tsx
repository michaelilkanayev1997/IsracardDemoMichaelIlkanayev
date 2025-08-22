import { FC } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useTheme from "@/hooks/useTheme";
import { hapticPress } from "@/utils/HapticFeedback";

export interface Option {
  label: string;
  value: string;
}

interface OptionModalProps {
  visible: boolean;
  title?: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const OptionModal: FC<OptionModalProps> = ({
  visible,
  title,
  options,
  selected,
  onSelect,
  onClose,
}) => {
  const { theme } = useTheme();

  const handleSelect = (value: string) => {
    hapticPress();
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.menu, { backgroundColor: theme.SURFACE }]}>
          {title && (
            <Text style={[styles.menuTitle, { color: theme.TEXT_PRIMARY }]}>
              {title}
            </Text>
          )}

          <View style={styles.options}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.menuItem,
                  selected === opt.value && {
                    backgroundColor: theme.PRIMARY_LIGHT_TRANSPARENT,
                  },
                ]}
                onPress={() => handleSelect(opt.value)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    { color: theme.TEXT_PRIMARY },
                    selected === opt.value && {
                      fontWeight: "600",
                      color: theme.PRIMARY_DARK,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
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

export default OptionModal;
