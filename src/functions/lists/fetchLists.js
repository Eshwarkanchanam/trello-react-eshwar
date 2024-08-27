import axios from "axios";

let API_KEY = import.meta.env.VITE_API_KEY;
let TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getAllListsInBoard(boardId) {
  let response = await axios.get(
    `https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function getListById(listId) {
  let response = await axios.get(
    `https://api.trello.com/1/lists/${listId}?key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function createList(boardId, listName) {
  let response = await axios.post(
    `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}

export async function deleteListById(listId) {
  let response = await axios.put(
    `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${API_KEY}&token=${TOKEN}`
  );
  return response;
}
