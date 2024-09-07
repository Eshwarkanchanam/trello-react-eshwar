import { Box, Typography } from "@mui/material";
import React from "react";
import CheckListModal from "./CheckListModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Card = ({ card, onDeleteCard }) => {
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
            onDeleteCard(card.id,card.idList);
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
          onClose={handleClose}
          open={open}
          cardId={card.id}
        />
      )}
    </>
  );
};

export default Card;
