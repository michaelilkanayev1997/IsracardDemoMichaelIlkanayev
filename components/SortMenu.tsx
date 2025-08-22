import { FC, useState } from "react";

import CustomButton from "./CustomButton";
import OptionModal, { Option } from "./OptionModal";

export type SortOption = "title" | "pages" | "date";

interface SortMenuProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortMenu: FC<SortMenuProps> = ({ sortBy, onSortChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const options: Option[] = [
    { label: "Title (A–Z)", value: "title" },
    { label: "Pages", value: "pages" },
    { label: "Release Date", value: "date" },
  ];

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

      <OptionModal
        visible={showMenu}
        title="Sort by"
        options={options}
        selected={sortBy}
        onSelect={(val) => onSortChange(val as SortOption)}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
};

export default SortMenu;
