import axios from "axios";

let API_KEY = import.meta.env.VITE_API_KEY;
let TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getAllCheckItemsOnCheckList(checkListId) {
  try {
    let response = await axios.get(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCheckItemById(checkListId, checkItemId) {
  try {
    let response = await axios.get(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCheckItem(checkListId, checkItemName) {
  try {
    let response = await axios.post(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCheckItem(checkListId, checkItemId) {
  try {
    let response = await axios.delete(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function checkCheckItemOnCard(cardId, checkItemId) {
  try {
    let response = await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=complete&key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function uncheckCheckItemOnCard(cardId, checkItemId) {
  try {
    let response = await axios.put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=incomplete&key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
