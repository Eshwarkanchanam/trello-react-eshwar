import { Button, OutlinedInput, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { createBoard } from "../functions/boards/fetchBoards";
import { useNavigate } from "react-router-dom";

const CreateBoard = ({ setShowCreateBoard }) => {
  let [name, setName] = useState("");
  let navigate = useNavigate();

  async function createNewBoard() {
    try {
      let response = await createBoard(name);
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
    <Paper
      sx={{
        position: "absolute",
        border: 1,
        left: 0,
        top: "3rem",
        display: "flex",
        flexDirection: "column",
        p: 2,
        width: "200px",
        zIndex:10
      }}
      component={"div"}
    >
      <Typography sx={{ my: 1 }}>Board title*</Typography>
      <OutlinedInput
        sx={{ fontSize: "0.8rem", my: 1 }}
        placeholder="enter board name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button
        variant="contained"
        disabled={name.length === 0}
        onClick={() => {
          setShowCreateBoard(false);
          createNewBoard();
        }}
      >
        create
      </Button>
    </Paper>
  );
};

export default CreateBoard;
