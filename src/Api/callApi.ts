import {BASE_URL} from "../constants/api";

interface params {
  method: string,
  path: string,
  payload?: Record<any, any>,
  options?: Record<string, unknown>
}

interface options {
  method: string,
  headers: Record<string, string>,
  options?: Record<string, unknown>,
  body?: string
}

export const callApi = async (params : params) => {
  const options: options = {
    method: `${params.method}`,
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    ...params?.options,

  }

  if(params?.payload) {
    options.body = JSON.stringify(params.payload)
  }

  const response = await fetch(
    `${BASE_URL}${params.path}`,
    options
  );
  if(!response.ok) {
    return "error:" + JSON.parse(await response.text()).message
  }
  return await response.json()
}
