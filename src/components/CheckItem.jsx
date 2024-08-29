import { Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CheckItem = ({ checkitem, handleDeleteCheckItem, handleCheckItem }) => {
  return (
    <Stack
      sx={{ border: 1, borderRadius: 1 }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      my={1}
    >
      <FormControlLabel
        control={<Checkbox />}
        label={checkitem.name}
        key={checkitem.id}
        sx={{
          ml: 1,
          textDecoration: checkitem.state === "complete" && "line-through",
        }}
        onChange={(e) => {
          e.stopPropagation();
          handleCheckItem(checkitem.id);
        }}
        checked={checkitem.state === "complete"}
      />
      <Box
        component={"span"}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteCheckItem(checkitem.idChecklist, checkitem.id);
        }}
        sx={{ mr: 1 }}
      >
        <DeleteForeverIcon
          sx={{
            ":hover": {
              color: "red",
              border: 1,
              borderRadius: 1,
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default CheckItem;
