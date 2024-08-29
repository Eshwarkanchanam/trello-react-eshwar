import { Box, Button, ListItem, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createCard,
  deleteCard,
  getAllCardsOnList,
} from "../apis/cards/fetchCards";
import Card from "./Card";
import AddComponent from "./AddComponent";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteListById } from "../apis/lists/fetchLists";
import ListSkeleton from "./Skeletons/ListSkeleton";
import { useSnackbar } from "notistack";

const List = ({ list, setLists }) => {
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  async function handleCreateCard() {
    if (cardName.length === 0) {
      return;
    }

    try {
      let response = await createCard(list.id, cardName);
      if (response.status === 200) {
        let card = response.data;
        setCards((prevCards) => [...prevCards, card]);
        setCardName("");
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

  async function handleDeleteList() {
    try {
      enqueueSnackbar("Deleting list...", {
        variant: "error",
        autoHideDuration: 3000,
      });
      let response = await deleteListById(list.id);
      if (response.status === 200) {
        let deletedList = response.data;
        setLists((prevLists) =>
          prevLists.filter((list) => list.id !== deletedList.id)
        );
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

  async function handleDeleteCard(cardId) {
    try {
      enqueueSnackbar("Deleting card...", {
        variant: "error",
        autoHideDuration: 3000,
      });
      let response = await deleteCard(cardId);
      if (response.status === 200) {
        setCards(cards.filter((card) => cardId !== card.id));
        enqueueSnackbar("Deleted card succesfully", {
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

  useEffect(() => {
    async function fetchCards() {
      try {
        setIsLoading(true);
        let response = await getAllCardsOnList(list.id);
        setCards(response.data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCards();
  }, []);

  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      {isLoading && <ListSkeleton />}
      {!isLoading && (
        <Box>
          <Box
            sx={{
              mr: 2,
              p: 1,
              border: 1,
              display: "inline-flex",
              flexDirection: "column",
              width: "200px",
              borderRadius: 1,
              padding: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography>{list.name}</Typography>
              <DeleteForeverIcon
                onClick={handleDeleteList}
                sx={{
                  ":hover": {
                    color: "red",
                    border: 1,
                    borderRadius: 1,
                  },
                }}
              />
            </Box>
            {cards.map((card) => (
              <Card key={card.id} card={card} handleDelete={handleDeleteCard} />
            ))}
            <AddComponent
              itemName={"add card"}
              name={cardName}
              setName={setCardName}
              handleCreate={handleCreateCard}
              placeholder={"enter new card"}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default List;
