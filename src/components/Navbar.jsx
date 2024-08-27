import React, { useState } from "react";
import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import CreateBoard from "./CreateBoard";
import CreateComponent from "./CreateComponent";
import { createBoard } from "../functions/boards/fetchBoards";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();

  async function createNewBoard() {
    try {
      let response = await createBoard(boardName);
      if (response.status === 200) {
        let board = response.data;
        let boardId = board.id;
        navigate(`/boards/${boardId}`);
      } else {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      console.log(error);
      // yet to create a toast
    }
  }

  return (
    <AppBar sx={{ p: 2, bgcolor: "gray", position: "static" }}>
      <>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h5">Trello</Typography>
          <Box sx={{ position: "relative" }}>
            <Button
              variant="contained"
              sx={{
                displayPrint: "inline",
                ml: 4,
                color: "black",
              }}
              onClick={(e) => {
                setShowCreateBoard((prev) => !prev);
              }}
            >
              <Typography sx={{ fontSize: "0.8rem" }}>Create board</Typography>
            </Button>
            {showCreateBoard && (
              // <CreateBoard setShowCreateBoard={setShowCreateBoard} />
              <CreateComponent
                title={"Board Title"}
                placeholder={"enter board name"}
                name={boardName}
                setName={setBoardName}
                setShow={setShowCreateBoard}
                handleCreate={createNewBoard}
              />
            )}
          </Box>
        </Box>
      </>
    </AppBar>
  );
};

export default Navbar;
