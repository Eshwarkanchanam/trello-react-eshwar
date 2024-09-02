function listsReducer(lists, action) {
  switch (action.type) {
    case "fetchLists": {
      let fetchedLists = action.payload;
      return fetchedLists;
    }
    case "addList": {
      let addedList = action.payload;
      return [...lists, addedList];
    }
    case "deleteList": {
      let deletedId = action.deletedId;
      return lists.filter((list) => list.id !== deletedId);
    }
    default: {
      throw new Error("Invalid action : " + action.type);
    }
  }
}

export default listsReducer;
