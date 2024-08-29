import React, { useState } from "react";
import { AppBar, Box, Stack, Typography } from "@mui/material";
import CreateComponent from "./CreateComponent";
import { createBoard } from "../apis/boards/fetchBoards";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaTrello } from "react-icons/fa";

const Navbar = () => {
  const [boardName, setBoardName] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function createNewBoard() {
    try {
      let response = await createBoard(boardName);
      if (response.status === 200) {
        let board = response.data;
        let boardId = board.id;
        setBoardName("");
        enqueueSnackbar("created board successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate(`/boards/${boardId}`);
      } else {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  return (
    <AppBar sx={{ p: 2, bgcolor: "#1D2125", position: "static" }}>
      <Box sx={{ display: "flex" }}>
        <Stack
          variant="h5"
          direction={"row"}
          alignItems={"center"}
          fontSize={20}
        >
          <FaTrello style={{ marginRight: 6 }} />{" "}
          <Typography fontSize={20}>Trello</Typography>
        </Stack>

        <CreateComponent
          buttonName={"Create Board"}
          title={"Board Title"}
          placeholder={"enter board name"}
          name={boardName}
          setName={setBoardName}
          handleCreate={createNewBoard}
        />
      </Box>
    </AppBar>
  );
};

export default Navbar;
