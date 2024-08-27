import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Board = ({ board }) => {
  return (
    <Box width={150} height={100} mr={1} display={"inline-block"}>
      <Paper sx={{ width: "100%", height: "100%" }} elevation={2}>
        <Typography sx={{ pl: 2, pt: 2 }}>{board.name}</Typography>
      </Paper>
    </Box>
  );
};

export default Board;
