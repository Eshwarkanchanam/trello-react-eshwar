import { Box, Button, ListItem, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import {
  createCard,
  deleteCard,
} from "../apis/cards/fetchCards";
import Card from "./Card";
import AddComponent from "./AddComponent";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListSkeleton from "./Skeletons/ListSkeleton";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  addCard,
  deleteCard as deleteCardAction,
} from "../features/card/cardSlice";

const List = ({ list, onDeleteList }) => {

  const { loading, cards, error } = useSelector((state) => state.card);
  const dispatch = useDispatch();

  const [cardName, setCardName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchCards(list.id));
  }, []);

  async function handleCreateCard() {
    if (cardName.length === 0) {
      return;
    }

    try {
      let response = await createCard(list.id, cardName);
      if (response.status === 200) {
        let card = response.data;
        dispatch(addCard(card));
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

  async function handleDeleteCard(cardId, listId) {
    try {
      enqueueSnackbar("Deleting card...", {
        variant: "error",
        autoHideDuration: 3000,
      });
      let response = await deleteCard(cardId);
      if (response.status === 200) {
        dispatch(
          deleteCardAction({
            cardId,
            listId,
          })
        );
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

  if (error) {
    return <Typography>Something went wrong</Typography>;
  }

  return (
    <>
      {loading && <ListSkeleton />}
      {!loading && (
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
            {cards[list.id]?.map((card) => (
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
