import "../App.css";
import { Button, Box } from "@mui/material";
import { PersonalItem } from "../types";
import { removeLocalItem } from "../functions";

export const ItemModal = ({
  item,
  onClose,
  setCurrentItems,
}: {
  item: PersonalItem;
  onClose: () => void;
  setCurrentItems: (items: PersonalItem[]) => void;
}) => {
  const removeItem = () => {
    removeLocalItem(item, setCurrentItems);
    onClose();
  };
  return (
    <div className="itemModal">
      <Box>{item.name}</Box>
      <div>
        <Button onClick={removeItem}>Remove Item</Button>
      </div>
      <div className="modalClose">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
