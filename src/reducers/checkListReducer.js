function checkListReducer(checkLists, action) {
  switch (action.type) {
    case "fetchCheckLists": {
      let fetchedCheckLists = action.payload;
      return fetchedCheckLists;
    }
    case "addCheckList": {
      let addedCheckList = action.payload;
      return [...checkLists, addedCheckList];
    }
    case "deleteCheckList": {
      let deletedCheckListId = action.deletedCheckListId;
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
