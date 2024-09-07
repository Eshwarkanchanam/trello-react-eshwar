import { createSlice } from "@reduxjs/toolkit";
import { deleteChecklist } from "../checklist/checklistSlice";

const initialState = {
  checkitems: {},
  error: "",
};

const checkitemSlice = createSlice({
  name: "checkitem",
  initialState,
  reducers: {
    createCheckitems: (state, action) => {
      let checklist = action.payload;
      let checklistId = checklist.id;
      let checkitems = checklist.checkItems;
      // console.log(checklist);

      state.checkitems[checklistId] = checkitems || [];
    },
    addCheckitem: (state, action) => {
      let checkitem = action.payload;
      let checklistId = checkitem.idChecklist;
      console.log(checkitem, checklistId);

      state.checkitems[checklistId].push(checkitem);
    },
    deleteCheckitem: (state, action) => {
      let { checkItemId, checkListId } = action.payload;
      state.checkitems[checkListId] = state.checkitems[checkListId].filter(
        (currCheckitem) => currCheckitem.id !== checkItemId
      );
    },
    checkOrUncheckItem: (state, action) => {
      const {
        state: stateOfCheckitem,
        id: checkItemId,
        idChecklist,
      } = action.payload;
      let prevCheckitem = state.checkitems[idChecklist].find(
        (checkitem) => checkitem.id === checkItemId
      );
      prevCheckitem.state = stateOfCheckitem;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteChecklist, (state, action) => {
      let checklistId = action.payload.checklistId;
      delete state.checkitems[checklistId];
    });
  },
});

export const {
  createCheckitems,
  addCheckitem,
  deleteCheckitem,
  checkOrUncheckItem,
} = checkitemSlice.actions;
export default checkitemSlice.reducer;
