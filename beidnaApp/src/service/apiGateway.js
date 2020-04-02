import axios from 'axios';

const API_URL = 'http://beidnakerfi-api.herokuapp.com';

export const login = async (userlogin) => {
  const query = await axios.post(`${API_URL}/api/login/`, {
      username: userlogin.username,
      password: userlogin.password,
    })
    .then((resp) => {
      return resp
    })
    .catch((e) => e.response);
  return query;
};

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
