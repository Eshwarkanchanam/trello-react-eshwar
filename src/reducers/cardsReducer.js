function cardsReducer(cards, action) {
  switch (action.type) {
    case "fetchCards": {
      let fetchedCards = action.payload;
      return fetchedCards;
    }
    case "addCard": {
      let addedcard = action.payload;
      return [...cards, addedcard];
    }
    case "deleteCard": {
      let deletedCardId = action.deletedCardId;
      return cards.filter((card) => card.id !== deletedCardId);
    }
    default: {
      throw new Error("Invalid action type : " + action.type);
    }
  }
}

export default cardsReducer;
