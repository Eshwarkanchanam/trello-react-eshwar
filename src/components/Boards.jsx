import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Board from "./Board";
import { Link } from "react-router-dom";
import BoardSkeleton from "./Skeletons/BoardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../features/board/boardSlice";
import { enqueueSnackbar } from "notistack";

const Boards = () => {
  let { loading, error, boards } = useSelector((state) => state.board);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  if (error) {
    enqueueSnackbar(boardState.error, {
      variant: "error",
      autoHideDuration: 3000,
    });
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      <Box m={4}>
        <Typography variant="h4" sx={{ my: 4 }}>
          Boards
        </Typography>
        {loading && <BoardSkeleton />}
        {!loading &&
          boards.map((board) => (
            <Link to={`/boards/${board.id}`} key={board.id}>
              <Board board={board} />
            </Link>
          ))}
      </Box>
    </>
  );
};

export default Boards;
