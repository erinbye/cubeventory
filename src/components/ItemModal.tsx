import "../App.css";
import { Tooltip, Box, IconButton, TextField, Backdrop } from "@mui/material";
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
    <>
      {isEditing ? (
        <TextField
          ref={ref}
          error={error}
          value={tempTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Box onClick={() => setIsEditing(true)}>{tempTitle}</Box>
      )}
    </>
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
  const ref = useRef(null);
  const removeItem = () => {
    removeLocalItem(item, setCurrentItems);
    onClose();
  };
  const rotateItem = () => {
    const rotatedSize = [item.size[1], item.size[0]];
    updateLocalItem(item.id, "size", rotatedSize, setCurrentItems);
  };
  const updateTitle = (newTitle: string) => {
    updateLocalItem(item.id, "name", newTitle, setCurrentItems);
  };
  useOnClickOutside(ref, onClose);
  return (
    <>
      <Backdrop open={true} sx={{ zIndex: 10 }}>
        <div className="itemModal" ref={ref}>
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
      </Backdrop>
    </>
  );
};
