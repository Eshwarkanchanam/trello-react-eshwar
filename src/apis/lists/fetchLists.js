import axios from "axios";

let API_KEY = import.meta.env.VITE_API_KEY;
let TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getAllListsInBoard(boardId) {
  try {
    let response = await axios.get(
      `https://api.trello.com/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getListById(listId) {
  try {
    let response = await axios.get(
      `https://api.trello.com/1/lists/${listId}?key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createList(boardId, listName) {
  try {
    let response = await axios.post(
      `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteListById(listId) {
  try {
    let response = await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${API_KEY}&token=${TOKEN}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
