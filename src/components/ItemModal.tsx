import "../App.css";
import { Tooltip, Box, IconButton, TextField } from "@mui/material";
import { PersonalItem } from "../types";
import { removeLocalItem, updateLocalItem } from "../functions";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Rotate90DegreesCwIcon from "@mui/icons-material/Rotate90DegreesCw";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const TitleBox = ({
  title,
  updateTitle,
}: {
  title: string;
  updateTitle: (title: string) => void;
}) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (newVal === "") {
      setError(true);
    } else {
      setError(false);
    }
    setTempTitle(newVal);
  };
  const handleSave = () => {
    if (error) {
      return;
    }
    updateTitle(tempTitle);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };
  useOnClickOutside(ref, handleSave);
  return (
    <div ref={ref} onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <TextField
          error={error}
          value={tempTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Box>{title}</Box>
      )}
    </div>
  );
};

const SmallIconButton = ({
  tooltipText,
  onClick,
  icon,
}: {
  tooltipText: string;
  onClick: () => void;
  icon: JSX.Element;
}) => {
  return (
    <Tooltip title={tooltipText}>
      <IconButton onClick={onClick} size="small">
        {icon}
      </IconButton>
    </Tooltip>
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
  const rotateItem = () => {
    // TODO: figure out how best to save the coords again (they mess up if you refresh)
    const rotatedSize = [item.size[1], item.size[0]];
    item.size = rotatedSize;
    updateLocalItem(item, setCurrentItems);
  };
  const updateTitle = (newTitle: string) => {
    item.name = newTitle;
    updateLocalItem(item, setCurrentItems);
  };
  return (
    <div className="itemModal">
      <TitleBox title={item.name} updateTitle={updateTitle} />
      <div className="modalBottomLeft">
        <SmallIconButton
          tooltipText="Delete item"
          onClick={removeItem}
          icon={<DeleteIcon fontSize="small" />}
        />
        <SmallIconButton
          tooltipText="Rotate item"
          onClick={rotateItem}
          icon={<Rotate90DegreesCwIcon fontSize="small" />}
        />
      </div>
      <div className="modalBottomRight">
        <SmallIconButton
          tooltipText="Close popup"
          onClick={onClose}
          icon={<CloseIcon fontSize="small" />}
        />
      </div>
    </div>
  );
};
