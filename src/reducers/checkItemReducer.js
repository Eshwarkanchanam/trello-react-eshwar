function checkItemReducer(checkItems, action) {
  switch (action.type) {
    case "addCheckItem": {
      let addedCheckItem = action.payload;
      return [...checkItems, addedCheckItem];
    }
    case "deleteCheckItem": {
      let deletedCheckItemId = action.deletedCheckItemId;
      return checkItems.filter(
        (checkitem) => checkitem.id !== deletedCheckItemId
      );
    }
    case "checkOrUncheckCheckItem": {
      let state = action.state;
      let checkItemId = action.checkItemId;
      return checkItems.map((checkitem) => {
        if (checkitem.id === checkItemId) {
          return { ...checkitem, state };
        }
        return checkitem;
      });
    }
    default: {
      throw new Error("Invalid action type : " + action.type);
    }
  }
}

export default checkItemReducer;