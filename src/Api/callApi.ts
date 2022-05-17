import {BASE_URL} from "../constants/api";

export const callApi =
  async (method: string, path: string, payload: {any: any}, additional: {options: {string: any}}) => {
  const options = {
    method: `${method}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    ...additional?.options
  }
  if(payload) {
    //options.body = JSON.stringify(payload)
  }

  const response = await fetch(
    `${BASE_URL}${path}`,
    options
  );
  if(!response.ok) {
    return "error:" + JSON.parse(await response.text()).message
  }
  return await response.json()
}
