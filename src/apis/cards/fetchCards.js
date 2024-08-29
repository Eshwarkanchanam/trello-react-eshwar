import axios from "axios";

let API_KEY = import.meta.env.VITE_API_KEY;
let TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getAllCardsOnList(listId) {
  try {
    let response = await axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createCard(listId, cardName) {
  try {
    let response = await axios.post(
      `https://api.trello.com/1/cards?idList=${listId}&name=${cardName}&key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCardById(cardId) {
  try {
    let response = await axios.get(
      `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCard(cardId) {
  try {
    let response = await axios.delete(
      `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
