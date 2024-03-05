import "../App.css";
import { Tooltip, Box, IconButton, TextField, Backdrop } from "@mui/material";
import { PersonalItem } from "../types";
import { removeLocalItem, updateLocalItem } from "../functions";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Rotate90DegreesCwIcon from "@mui/icons-material/Rotate90DegreesCw";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const InputBox = ({
  value,
  updateValue,
  includeEmptyState = false,
  multiline = false,
}: {
  value: string;
  updateValue: (value: string) => void;
  includeEmptyState?: boolean;
  multiline?: boolean;
}) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [error, setError] = useState(false);
  const showEmptyState = includeEmptyState && tempValue === "";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (!includeEmptyState && newVal === "") {
      setError(true);
    } else {
      setError(false);
    }
    setTempValue(newVal);
  };
  const handleSave = () => {
    if (error) {
      return;
    }
    updateValue(tempValue);
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
          value={tempValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          multiline={multiline}
          fullWidth
        />
      ) : (
        <Box onClick={() => setIsEditing(true)} sx={{ cursor: "pointer" }}>
          {showEmptyState ? "+ add" : tempValue}
        </Box>
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
  const updateNotes = (newNotes: string) => {
    updateLocalItem(item.id, "notes", newNotes, setCurrentItems);
  };
  useOnClickOutside(ref, onClose);
  return (
    <>
      <Backdrop open={true} sx={{ zIndex: 10 }}>
        <div className="itemModal" ref={ref}>
          <Box mb={2}>
            <InputBox value={item.name} updateValue={updateTitle} />
          </Box>

          <Box>
            <Box sx={{ fontWeight: 500 }} mb={0.5}>
              Notes
            </Box>
            <InputBox
              value={item.notes ?? ""}
              updateValue={updateNotes}
              includeEmptyState
              multiline
            />
          </Box>

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
