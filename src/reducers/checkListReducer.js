export const FETCH_CHECKLIST = "FETCH_CHECKLIST";
export const ADD_CHECKLIST = "ADD_CHECKLIST";
export const DELETE_CHECKLIST = "DELETE_CHECKLIST";

function checkListReducer(checkLists, action) {
  switch (action.type) {
    case FETCH_CHECKLIST: {
      let fetchedCheckLists = action.payload;
      return fetchedCheckLists;
    }
    case ADD_CHECKLIST: {
      let addedCheckList = action.payload;
      return [...checkLists, addedCheckList];
    }
    case DELETE_CHECKLIST: {
      let deletedCheckListId = action.payload;
      return checkLists.filter(
        (checklist) => checklist.id !== deletedCheckListId
      );
    }
    default: {
      throw new Error("Invalid action : " + action.type);
    }
  }
}

export default checkListReducer;
