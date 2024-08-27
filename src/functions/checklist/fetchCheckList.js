import axios from "axios";

let API_KEY = import.meta.env.VITE_API_KEY;
let TOKEN = import.meta.env.VITE_API_TOKEN;
export async function getAllCheckListsOnCard(cardId) {
  let response = await axios.get(
    `https://api.trello.com/1/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function getCheckListById(checkListId) {
  let response = await axios.get(
    `https://api.trello.com/1/checklists/${checkListId}?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function createCheckList(cardId, checkListName) {
  let response = await axios.post(
    `https://api.trello.com/1/checklists?idCard=${cardId}&name=${checkListName}&key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function deleteCheckList(checkListId) {
  let response = await axios.delete(
    `https://api.trello.com/1/checklists/${checkListId}?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}
