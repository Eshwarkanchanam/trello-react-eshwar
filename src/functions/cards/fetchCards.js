import axios from "axios";

let API_KEY = import.meta.env.VITE_API_KEY;
let TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getAllCardsOnList(listId) {
  let response = await axios.get(
    `https://api.trello.com/1/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}
export async function createCard(listId, cardName) {
  let response = await axios.post(
    `https://api.trello.com/1/cards?idList=${listId}&name=${cardName}&key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function getCardById(cardId) {
  let response = await axios.get(
    `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function deleteCard(cardId) {
  let response = await axios.delete(
    `https://api.trello.com/1/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}
