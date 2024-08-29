import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import List from "./List";

import HomeIcon from "@mui/icons-material/Home";
import AddComponent from "./AddComponent";
import DetailPageSkeleton from "./Skeletons/DetailPageSkeleton";
import { createList, getAllListsInBoard } from "../apis/lists/fetchLists";
import { useSnackbar } from "notistack";

const DetailBoardPage = () => {
  const { boardId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchLists() {
      try {
        setIsLoading(true);

        let response = await getAllListsInBoard(boardId);
        let lists = response.data;
        console.log(lists);

        setLists(lists);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLists();
  }, []);

  async function handleCreateList() {
    if (listName.length === 0) {
      return;
    }
    try {
      let response = await createList(boardId, listName);
      if (response.status === 200) {
        let list = response.data;
        setLists((prevLists) => [...prevLists, list]);
        setListName("");
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      {isLoading && <DetailPageSkeleton />}
      {!isLoading && (
        <Box>
          <Link to={"/boards"}>
            <Button variant="contained" sx={{ mt: 4, ml: 4 }}>
              <HomeIcon sx={{ mr: 1 }} />
              <Typography>Boards</Typography>
            </Button>
          </Link>

          <Box
            sx={{
              overflowY: "scroll",
              display: "inline-flex",
              gap: 1,
              width: "100vw",
              mt: 4,
              pl: 4,
              scrollbarWidth:'none'
            }}
          >
            {lists.map((list) => (
              <List list={list} key={list.id} setLists={setLists} />
            ))}
            <AddComponent
              itemName={"add list"}
              name={listName}
              setName={setListName}
              handleCreate={handleCreateList}
              placeholder={"enter new list"}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default DetailBoardPage;
