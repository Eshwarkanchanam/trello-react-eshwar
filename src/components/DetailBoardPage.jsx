import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import List from "./List";

import HomeIcon from "@mui/icons-material/Home";
import AddComponent from "./AddComponent";
import DetailPageSkeleton from "./Skeletons/DetailPageSkeleton";
import { createList, deleteListById } from "../apis/lists/fetchLists";
import { useSnackbar } from "notistack";

import { fetchLists, addList, deleteList } from "../features/list/listSlice";
import { useDispatch, useSelector } from "react-redux";

const DetailBoardPage = () => {
  const { boardId } = useParams();
  let { loading, error, lists } = useSelector((state) => state.list);
  let dispatch = useDispatch();
  const [listName, setListName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchLists(boardId));
  }, [boardId]);

  async function handleCreateList() {
    if (listName.length === 0) {
      return;
    }
    try {
      let response = await createList(boardId, listName);
      if (response.status === 200) {
        let list = response.data;
        dispatch(addList(list));
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
        dispatch(deleteList(listId));
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

  if (error) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      {loading && <DetailPageSkeleton />}
      {!loading && (
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
