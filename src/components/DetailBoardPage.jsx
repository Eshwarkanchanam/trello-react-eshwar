import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import List from "./List";

import HomeIcon from "@mui/icons-material/Home";
import AddComponent from "./AddComponent";
import DetailPageSkeleton from "./Skeletons/DetailPageSkeleton";
import {
  createList,
  deleteListById,
  getAllListsInBoard,
} from "../apis/lists/fetchLists";
import { useSnackbar } from "notistack";
import listsReducer from "../reducers/listsReducer";

const DetailBoardPage = () => {
  const { boardId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [lists, dispatch] = useReducer(listsReducer, []);
  const [listName, setListName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchLists() {
      try {
        setIsLoading(true);

        let response = await getAllListsInBoard(boardId);
        let lists = response.data;
        console.log(lists);
        dispatch({
          type: "fetchLists",
          payload: lists,
        });
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLists();
  }, [boardId]);

  async function handleCreateList() {
    if (listName.length === 0) {
      return;
    }
    try {
      let response = await createList(boardId, listName);
      if (response.status === 200) {
        let list = response.data;
        dispatch({
          type: "addList",
          payload: list,
        });
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

  async function handleDeleteList(listId) {
    try {
      enqueueSnackbar("Deleting list...", {
        variant: "error",
        autoHideDuration: 3000,
      });
      let response = await deleteListById(listId);
      if (response.status === 200) {
        let deletedList = response.data;
        dispatch({
          type: "deleteList",
          deletedId: deletedList.id,
        });
        enqueueSnackbar("Deleted list Successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      console.error(error);
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
              scrollbarWidth: "none",
            }}
          >
            {lists.map((list) => (
              <List list={list} key={list.id} onDeleteList={handleDeleteList} />
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
