function boardsReducers(boards, action) {
  switch (action.type) {
    case "fetchBoards": {
      let fetchedBoards = action.payload;
      return fetchedBoards;
    }
    default: {
      throw new Error("Invalid action type : " + action.type);
    }
  }
}

export default boardsReducers;
