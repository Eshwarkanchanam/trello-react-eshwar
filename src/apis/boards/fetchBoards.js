import axios from "axios";

let API_KEY = import.meta.env.VITE_API_KEY;
let TOKEN = import.meta.env.VITE_API_TOKEN;

let URL_FOR_BOARDS = `https://api.trello.com/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`;

export async function getAllBoards() {
  try {
    let response = await axios.get(URL_FOR_BOARDS);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createBoard(name) {
  let URL_FOR_CREATE_BOARD = `https://api.trello.com/1/boards/?name=${name}&key=${API_KEY}&token=${TOKEN}`;
  try {
    let response = await axios.post(URL_FOR_CREATE_BOARD);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
