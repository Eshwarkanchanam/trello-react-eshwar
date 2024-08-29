import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const CheckItemsProgress = ({ progress = 0 }) => {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <Typography>{progress + " %"}</Typography>
        <Box
          sx={{
            border: 1,
            height: "0.5rem",
            borderRadius: 1,
            my: 2,
            flex: 1,
            ml: 1,
            display: "flex",
          }}
        >
          <Box
            component={"div"}
            sx={{ backgroundColor: "#1976D2" }}
            width={progress + "%"}
          ></Box>
        </Box>
      </Stack>
    </>
  );
};

export default CheckItemsProgress;
