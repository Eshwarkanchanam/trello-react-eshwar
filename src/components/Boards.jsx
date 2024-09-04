import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { getAllBoards } from "../apis/boards/fetchBoards";
import Board from "./Board";
import { Link } from "react-router-dom";
import BoardSkeleton from "./Skeletons/BoardSkeleton";
import boardsReducers, {
  FETCH_BOARDS,
  FETCH_BOARDS_ERROR,
  FETCH_BOARDS_LOADING,
} from "../reducers/boardsReducer";

const Boards = () => {
  let [boards, dispatch] = useReducer(boardsReducers, {
    loading: false,
    data: [],
    error: "",
  });

  useEffect(() => {
    async function fetchBoards() {
      try {
        dispatch({
          type: FETCH_BOARDS_LOADING,
        });
        let response = await getAllBoards();
        if (response.status === 200) {
          let openedBoards = response.data.filter((board) => !board.closed);
          dispatch({
            type: FETCH_BOARDS,
            payload: openedBoards,
          });
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error);

        dispatch({
          type: FETCH_BOARDS_ERROR,
          payload: error,
        });
      }
    }
    fetchBoards();
  }, []);

  if (boards.error) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      <Box m={4}>
        <Typography variant="h4" sx={{ my: 4 }}>
          Boards
        </Typography>
        {boards.loading && <BoardSkeleton />}
        {!boards.loading &&
          boards.data.map((board) => (
            <Link to={`/boards/${board.id}`} key={board.id}>
              <Board board={board} />
            </Link>
          ))}
      </Box>
    </>
  );
};

export default Boards;
