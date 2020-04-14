import axios from 'axios';

const API_URL = 'http://beidnakerfi-api.herokuapp.com';

export const login = async (userlogin) => axios.post(`${API_URL}/api/login/`, {
  username: userlogin.username,
  password: userlogin.password,
}).then((resp) => resp)
  .catch((e) => e.response);

<<<<<<< HEAD
export const generateCheque = async (apiKey, userId, depId) => axios.post(`${API_URL}/api/cheques/`, {
  user_id: userId,
  dep_id: depId,
}, {
  headers: {
    authorization: `Token ${apiKey}`,
  },
}).then((resp) => resp.data)
  .catch((e) => e.response);
=======
export const generateCheque = async (apiKey, userId, depId) => {
  const query = await axios
    .post(`${API_URL}/api/cheques/`, {
      user_id: userId,
      dep_id: depId

    }, {
      headers: {
        authorization: `Token ${apiKey}`
      }
    })
    .then((resp) => resp)
    .catch((e) => e.response);

  return query.data;
}
export const deleteCheque = async (apiKey, chequePK) => {
  const query = await axios
    .delete(`${API_URL}/api/cheques/${chequePK}/`, {
      headers: {
        authorization: `Token ${apiKey}`
      }
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  console.log(query)
  return query.data;
}
>>>>>>> master
