import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllBoards } from "../apis/boards/fetchBoards";
import Board from "./Board";
import { Link } from "react-router-dom";
import BoardSkeleton from "./Skeletons/BoardSkeleton";

const Boards = () => {
  let [boards, setBoards] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchBoards() {
      try {
        setIsLoading(true);
        let response = await getAllBoards();
        if (response.status === 200) {
          let openedBoards = response.data.filter((board) => !board.closed);
          setBoards(openedBoards);
          setIsError(false);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error);

        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBoards();
  }, []);

  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      <Box m={4}>
        <Typography variant="h4" sx={{ my: 4 }}>
          Boards
        </Typography>
        {isLoading && <BoardSkeleton />}
        {!isLoading &&
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
