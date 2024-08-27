import { Box, ListItem, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createCard, getAllCardsOnList } from "../functions/cards/fetchCards";
import Card from "./Card";
import AddComponent from "./AddComponent";

const List = ({ list }) => {
  let [cards, setCards] = useState([]);
  let [addNewCard, setAddNewCard] = useState(false);
  let [cardName, setCardName] = useState("");

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
      //yet to create a toast
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let response = await getAllCardsOnList(list.id);
        console.log(response.data);
        setCards(response.data);
      } catch (error) {
      } finally {
      }
    })();
  }, []);

  return (
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
        <Typography>{list.name}</Typography>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        <AddComponent
          show={addNewCard}
          setShow={setAddNewCard}
          itemName={"add card"}
          name={cardName}
          setName={setCardName}
          handleCreate={handleCreateCard}
          placeholder={"enter new card"}
        />
      </Box>
    </Box>
  );
};

export default List;
