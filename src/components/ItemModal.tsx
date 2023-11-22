import "../App.css";
import { Tooltip, Box, IconButton, TextField } from "@mui/material";
import { PersonalItem } from "../types";
import { removeLocalItem, updateLocalItem } from "../functions";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const TitleBox = ({
  title,
  updateTitle,
}: {
  title: string;
  updateTitle: (title: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      updateTitle(tempTitle);
      setIsEditing(false);
    }
  };
  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <TextField
          value={tempTitle}
          onChange={handleChange}
          onKeyDown={handleEnter}
        ></TextField>
      ) : (
        <Box>{title}</Box>
      )}
    </div>
  );
};

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
  const updateTitle = (newTitle: string) => {
    item.name = newTitle;
    updateLocalItem(item, setCurrentItems);
  };
  return (
    <div className="itemModal">
      <TitleBox title={item.name} updateTitle={updateTitle} />
      <div className="removeItemButton">
        <Tooltip title="Delete item">
          <IconButton onClick={removeItem} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="modalClose">
        <Tooltip title="Close popup">
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
