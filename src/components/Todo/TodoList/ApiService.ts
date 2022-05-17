import {BASE_URL} from "../../../constants/api";

export default function fetchTodos () {
  return fetch(
    `${BASE_URL}`,
    {headers: {

      }}
  )
    .then(response => {
      return response.json()})
}
