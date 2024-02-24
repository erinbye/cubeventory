import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

export const Dropdown = ({
  choices,
  label,
  setExternally,
  initialChoice = "",
  resetAfterPick,
}: {
  choices: string[];
  label: string;
  setExternally?: (choice: string) => void;
  initialChoice?: string;
  resetAfterPick?: boolean;
}): JSX.Element => {
  const [choiceName, setChoiceName] = useState(initialChoice);

  const handleChange = (e: SelectChangeEvent) => {
    const val = e.target.value;
    setChoiceName(resetAfterPick ? initialChoice : val);
    if (setExternally) {
      setExternally(val);
    }
  };
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={choiceName} label={label} onChange={handleChange}>
        {choices
          .sort((a, b) => a.localeCompare(b))
          .map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};
