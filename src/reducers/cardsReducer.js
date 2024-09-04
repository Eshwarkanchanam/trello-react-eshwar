export const FETCH_CARDS_LOADING = "FETCH_CARDS_LOADING";
export const FETCH_CARDS = "FETCH_CARDS";
export const FETCH_CARDS_ERROR = "FETCH_CARDS_ERROR";
export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";

function cardsReducer(cards, action) {
  switch (action.type) {
    case FETCH_CARDS_LOADING: {
      return {
        ...cards,
        loading: true,
      };
    }
    case FETCH_CARDS: {
      let fetchedCards = action.payload;
      return {
        loading: false,
        data: fetchedCards,
        error: "",
      };
    }
    case FETCH_CARDS_ERROR: {
      return {
        loading: false,
        data: [],
        error: action.payload.message,
      };
    }
    case ADD_CARD: {
      let addedcard = action.payload;
      let updatedCards = [...cards.data, addedcard];
      return {
        ...cards,
        data: updatedCards,
      };
    }
    case DELETE_CARD: {
      let deletedCardId = action.payload;
      let updatedCards = cards.data.filter((card) => card.id !== deletedCardId);
      return {
        ...cards,
        data: updatedCards,
      };
    }
    default: {
      throw new Error("Invalid action type : " + action.type);
    }
  }
}

export default cardsReducer;
