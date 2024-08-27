import { Box, Button, OutlinedInput, Stack } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const AddComponent = ({
  show,
  setShow,
  name,
  setName,
  itemName,
  handleCreate,
  placeholder,
}) => {
  return (
    <>
      {!show && (
        <Box>
          <Button
            sx={{ border: 1, width: "10rem" }}
            onClick={() => setShow(true)}
          >
            <AddIcon sx={{ mr: 1 }} /> {itemName}
          </Button>
        </Box>
      )}
      {show && (
        <Box sx={{ minWidth: "fit-content" }} display={"inline-block"}>
          <Box border={1} sx={{ borderRadius: 1 }}>
            <Stack sx={{ p: 1 }}>
              <OutlinedInput
                autoFocus
                type="text"
                placeholder={placeholder}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Stack
                direction={"row"}
                alignItems={"center"}
                mt={1}
                minWidth={"fit-content"}
              >
                <Button
                  variant="contained"
                  sx={{ mr: 1, minWidth: "fit-content" }}
                  onClick={handleCreate}
                >
                  {itemName}
                </Button>
                <CloseIcon onClick={() => setShow(false)} />
              </Stack>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddComponent;
