import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import listReducer from "../features/list/listSlice";
import cardReducer from "../features/card/cardSlice";
import checklistReducer from "../features/checklist/checklistSlice";
import checkitemReducer from "../features/checkitems/checkitemSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    list: listReducer,
    card: cardReducer,
    checklist: checklistReducer,
    checkitem: checkitemReducer,
  },
});
