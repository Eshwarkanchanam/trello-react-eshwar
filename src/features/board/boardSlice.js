import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBoards } from "../../apis/boards/fetchBoards";

const initialState = {
  loading: false,
  boards: [],
  error: "",
};

const fetchBoards = createAsyncThunk("board/fetchBoards", async () => {
  const response = await getAllBoards();
  if (response.status === 200) {
    let openedBoards = response.data.filter((board) => !board.closed);
    return openedBoards;
  } else {
    throw new Error("Something went wrong");
  }
});

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
        state.error = "";
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
});

export { fetchBoards };
export default boardSlice.reducer;
