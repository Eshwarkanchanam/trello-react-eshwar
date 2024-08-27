import { Box } from "@mui/material";
import React from "react";
import CheckListModal from "./CheckListModal";

const Card = ({ card }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box
        sx={{ border: 1, my: 1, p: 1, maxWidth: "100%",display:'inline' }}
        component={"span"}
        onClick={handleOpen}
      >
        {card.name}
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
