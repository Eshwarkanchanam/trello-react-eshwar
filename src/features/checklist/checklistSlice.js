import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCheckListsOnCard } from "../../apis/checklist/fetchCheckList";
import { deleteCard } from "../card/cardSlice";
import { deleteList } from "../list/listSlice";

const initialState = {
  checklists: {},
  error: "",
};

const fetchChecklists = createAsyncThunk(
  "list/fetchChecklists",
  async (cardId) => {
    let response = await getAllCheckListsOnCard(cardId);
    if (response.status === 200) {
      let allCheckLists = response.data;
      return { allCheckLists, cardId };
    } else {
      throw new Error("something went wrong");
    }
  }
);

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    addChecklist: (state, action) => {
      let checklist = action.payload;
      let cardId = checklist.idCard;
      state.checklists[cardId].push(checklist);
    },
    deleteChecklist: (state, action) => {
      let checklistId = action.payload.checklistId;
      let cardId = action.payload.cardId;
      state.checklists[cardId] = state.checklists[cardId].filter(
        (checklist) => checklist.id !== checklistId
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        let { allCheckLists, cardId } = action.payload;
        state.checklists[cardId] = allCheckLists;
        state.error = "";
      })
      .addCase(fetchChecklists.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteCard, (state, action) => {
        let cardId = action.payload.cardId;
        delete state.checklists[cardId];
      }),
});

export const { addChecklist, deleteChecklist } = checklistSlice.actions;
export { fetchChecklists };
export default checklistSlice.reducer;
