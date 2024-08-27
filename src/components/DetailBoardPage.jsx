import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createList, getAllListsInBoard } from "../functions/lists/fetchLists";
import List from "./List";


import HomeIcon from "@mui/icons-material/Home";
import AddComponent from "./AddComponent";

const DetailBoardPage = () => {
  let { boardId } = useParams();
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(false);
  let [lists, setLists] = useState([]);
  let [addNewlist, setAddNewList] = useState(false);
  let [listName, setListName] = useState("");

  useEffect(() => {
    async function fetchLists() {
      try {
        setIsLoading(true);

        let response = await getAllListsInBoard(boardId);
        let lists = response.data;
        console.log(lists);

        setLists(lists);
        setError(false);
      } catch (error) {
        setError(true);
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
        setLists((prevLists) => [...prevLists, list]);
        setListName("");
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      //yet to create a toast
    }
  }

  return (
    <Box>
      <Link to={"/boards"}>
        <Button variant="contained" sx={{ mt: 4 }}>
          <HomeIcon sx={{ mr: 1 }} />
          <Typography>Boards</Typography>
        </Button>
      </Link>
      {isLoading && <Typography>loading...</Typography>}
      {error && <Typography>Something went wrong</Typography>}
      {!isLoading && !error && (
        <Box
          sx={{
            overflowY: "scroll",
            display: "inline-flex",
            gap: 1,
            width: "100vw",
            mt: 4,
          }}
        >
          {lists.map((list) => (
            <List list={list} key={list.id} />
          ))}
          <AddComponent
            show={addNewlist}
            setShow={setAddNewList}
            itemName={"add list"}
            name={listName}
            setName={setListName}
            handleCreate={handleCreateList}
            placeholder={"enter new list"}
          />
        </Box>
      )}
    </Box>
  );
};

export default DetailBoardPage;
