import axios from 'axios';

const API_URL = 'http://beidnakerfi-api.herokuapp.com';

export const login = async (userlogin) => axios.post(`${API_URL}/api/login/`, {
  username: userlogin.username,
  password: userlogin.password,
}).then((resp) => resp)
  .catch((e) => e.response);

export const generateCheque = async (apiKey, depId) => axios.post(`${API_URL}/api/cheques/`, {
  dep_id: depId,
}, {
  headers: {
    authorization: `Token ${apiKey}`,
  },
}).then((resp) => resp.data)
  .catch((e) => e.response);

export const deleteCheque = async (apiKey, chequePK) => axios.delete(`${API_URL}/api/cheques/${chequePK}/`, {
  headers: {
    authorization: `Token ${apiKey}`,
  },
}).then((resp) => resp.data)
  .catch((e) => e.response);

export const getUserInfo = async (apiKey, userId) => axios.get(`${API_URL}/api/users/${userId}/`, {
  headers: {
    authorization: `Token ${apiKey}`,
  },
}).then((resp) => resp.data)
  .catch((e) => e.response);

export const changePW = async (apiKey, userId, oldPW, newPW) => axios.put(`${API_URL}/api/users/${userId}/set_password/`, {
  old_password: oldPW,
  new_password: newPW,
}, {
  headers: {
    authorization: `Token ${apiKey}`,
  },
}).then((resp) => resp.data)
  .catch((e) => e.response);
