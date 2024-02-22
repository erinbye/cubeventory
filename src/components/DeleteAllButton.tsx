import { Button, Typography, Modal, Box } from "@mui/material";
import React, { useState } from "react";

const modalBoxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const DeleteAllButton = ({
  onDelete,
}: {
  onDelete: () => void;
}): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClickYes = () => {
    onDelete();
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={() => setIsModalOpen(true)}
      >
        Delete All Items
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalBoxStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to clear all your items?
          </Typography>
          <Button onClick={() => setIsModalOpen(false)}>No</Button>
          <Button variant="contained" color="error" onClick={onClickYes}>
            Yes
          </Button>
        </Box>
      </Modal>
    </>
  );
};
