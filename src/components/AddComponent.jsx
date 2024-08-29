import { Box, Button, OutlinedInput, Stack } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const AddComponent = ({
  name,
  setName,
  itemName,
  handleCreate,
  placeholder,
}) => {
  let [show, setShow] = useState(false);
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
                setName("");
              }}
            >
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
                m={1}
                minWidth={"fit-content"}
              >
                <Button variant="outlined" type="submit">
                  {itemName}
                </Button>
                <CloseIcon onClick={() => setShow(false)} />
              </Stack>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddComponent;
