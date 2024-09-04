export const FETCH_BOARDS = "FETCH_BOARDS";
export const FETCH_BOARDS_LOADING = "FETCH_BOARDS_LOADING";
export const FETCH_BOARDS_ERROR = "FETCH_BOARDS_ERROR";

function boardsReducers(boards, action) {
  switch (action.type) {
    case FETCH_BOARDS: {
      let fetchedBoards = action.payload;
      return {
        ...boards,
        loading: false,
        data: fetchedBoards,
      };
    }
    case FETCH_BOARDS_LOADING: {
      return {
        ...boards,
        loading: true,
      };
    }
    case FETCH_BOARDS_ERROR: {
      return {
        loading: false,
        data: [],
        error: action.payload.message,
      };
    }
    default: {
      throw new Error("Invalid action type : " + action.type);
    }
  }
}

export default boardsReducers;
