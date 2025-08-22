import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import CustomButton from "./CustomButton";
import OptionModal, { Option } from "./OptionModal";

export type SortOption = "title" | "pages" | "date";

interface SortMenuProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortMenu: FC<SortMenuProps> = ({ sortBy, onSortChange }) => {
  const { t } = useTranslation();

  const [showMenu, setShowMenu] = useState(false);

  const options: Option[] = [
    { label: t("sort.title"), value: "title" },
    { label: t("sort.pages"), value: "pages" },
    { label: t("sort.date"), value: "date" },
  ];
  return (
    <>
      {/* Sort Button */}
      <CustomButton
        icon="funnel-outline"
        label={
          sortBy === "title"
            ? t("sort.label.title")
            : sortBy === "pages"
            ? t("sort.label.pages")
            : t("sort.label.date")
        }
        onPress={() => setShowMenu(true)}
      />

      <OptionModal
        visible={showMenu}
        title={t("sort.modalTitle")}
        options={options}
        selected={sortBy}
        onSelect={(val) => onSortChange(val as SortOption)}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
};

export default SortMenu;
