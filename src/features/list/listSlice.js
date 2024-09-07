import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllListsInBoard } from "../../apis/lists/fetchLists";

const initialState = {
  loading: false,
  lists: [],
  error: "",
};

const fetchLists = createAsyncThunk("list/fetchLists", async (boardId) => {
  let response = await getAllListsInBoard(boardId);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("something went wrong");
  }
});

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
        state.error = "";
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
});
export const { addList, deleteList } = listSlice.actions;
export { fetchLists };
export default listSlice.reducer;
