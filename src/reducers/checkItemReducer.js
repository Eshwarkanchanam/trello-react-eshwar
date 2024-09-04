export const ADD_CHECKITEM = "ADD_CHECKITEM";
export const DELETE_CHECKITEM = "DELETE_CHECKITEM";
export const CHECK_OR_UNCHECK_CHECKITEM = "CHECK_OR_UNCHECK_CHECKITEM";

function checkItemReducer(checkItems, action) {
  switch (action.type) {
    case ADD_CHECKITEM: {
      let addedCheckItem = action.payload;
      return [...checkItems, addedCheckItem];
    }
    case DELETE_CHECKITEM: {
      let deletedCheckItemId = action.payload;
      return checkItems.filter(
        (checkitem) => checkitem.id !== deletedCheckItemId
      );
    }
    case CHECK_OR_UNCHECK_CHECKITEM: {
      let state = action.payload.state;
      let checkItemId = action.payload.checkItemId;
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
