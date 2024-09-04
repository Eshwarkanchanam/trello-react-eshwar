export const FETCH_LISTS_LOADING = "FETCH_LISTS_LOADING";
export const FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LISTS_ERROR = "FETCH_LISTS_ERROR";
export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";

function listsReducer(lists, action) {
  switch (action.type) {
    case FETCH_LISTS_LOADING: {
      return {
        ...lists,
        loading: true,
      };
    }
    case FETCH_LISTS: {
      let fetchedLists = action.payload;
      return {
        loading: false,
        data: fetchedLists,
        error: "",
      };
    }
    case FETCH_LISTS_ERROR: {
      return {
        loading: false,
        data: [],
        error: action.payload.message,
      };
    }
    case ADD_LIST: {
      let addedList = action.payload;
      let updatedLists = [...lists.data, addedList];
      return {
        ...lists,
        data: updatedLists,
      };
    }
    case DELETE_LIST: {
      let deletedId = action.payload;
      let updatedLists = lists.data.filter((list) => list.id !== deletedId);
      return {
        ...lists,
        data: updatedLists,
      };
    }
    default: {
      throw new Error("Invalid action : " + action.type);
    }
  }
}

export default listsReducer;
