import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCardsOnList } from "../../apis/cards/fetchCards";
import { deleteList } from "../list/listSlice";

const initialState = {
  loading: false,
  cards: {},
  error: "",
};

const fetchCards = createAsyncThunk("list/fetchCards", async (listId) => {
  let response = await getAllCardsOnList(listId);
  if (response.status === 200) {
    let cards = response.data;
    return { cards, listId };
  } else {
    throw new Error("something went wrong");
  }
});

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action) => {
      let card = action.payload;
      let listId = card.idList;
      state.cards[listId].push(card);
    },
    deleteCard: (state, action) => {
      let cardId = action.payload.cardId;
      let listId = action.payload.listId;
      state.cards[listId] = state.cards[listId].filter(
        (card) => card.id !== cardId
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        let { cards, listId } = action.payload;
        state.cards[listId] = cards;
        state.error = "";
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteList, (state, action) => {
        let listId = action.payload;
        delete state.cards[listId];
      }),
});

export const { addCard, deleteCard } = cardSlice.actions;
export { fetchCards };
export default cardSlice.reducer;
