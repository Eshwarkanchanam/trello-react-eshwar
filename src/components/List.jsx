import { Box, Button, ListItem, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import {
  createCard,
  deleteCard,
  getAllCardsOnList,
} from "../apis/cards/fetchCards";
import Card from "./Card";
import AddComponent from "./AddComponent";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListSkeleton from "./Skeletons/ListSkeleton";
import { useSnackbar } from "notistack";
import cardsReducer from "../reducers/cardsReducer";

const List = ({ list, onDeleteList }) => {
  const [cards, dispatch] = useReducer(cardsReducer, []);
  const [cardName, setCardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchCards() {
      try {
        setIsLoading(true);
        let response = await getAllCardsOnList(list.id);
        if (response.status === 200) {
          let allCards = response.data;
          dispatch({
            type: "fetchCards",
            payload: allCards,
          });
          setIsError(false);
        } else {
          throw new Error("something went wrong");
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCards();
  }, []);

  async function handleCreateCard() {
    if (cardName.length === 0) {
      return;
    }

    try {
      let response = await createCard(list.id, cardName);
      if (response.status === 200) {
        let card = response.data;
        dispatch({
          type: "addCard",
          payload: card,
        });
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

  async function handleDeleteCard(cardId) {
    try {
      enqueueSnackbar("Deleting card...", {
        variant: "error",
        autoHideDuration: 3000,
      });
      let response = await deleteCard(cardId);
      if (response.status === 200) {
        dispatch({
          type: "deleteCard",
          deletedCardId: cardId,
        });
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
                onClick={() => onDeleteList(list.id)}
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
              <Card key={card.id} card={card} onDeleteCard={handleDeleteCard} />
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
