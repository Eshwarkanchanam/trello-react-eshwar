import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CheckListModal from "./CheckListModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Card = ({ card, handleDelete }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box
        sx={{
          border: 1,
          my: 1,
          p: 1,
          maxWidth: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 1,
          ":hover": {
            scale: 1.02,
          },
        }}
        component={"span"}
        onClick={handleOpen}
      >
        <Typography>{card.name}</Typography>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(card.id);
          }}
        >
          <DeleteForeverIcon
            sx={{
              ":hover": {
                color: "red",
                border:1,
                borderRadius:1
              },

            }}
          />
        </Box>
      </Box>
      {open && (
        <CheckListModal
          handleClose={handleClose}
          open={open}
          cardId={card.id}
        />
      )}
    </>
  );
};

export default Card;
