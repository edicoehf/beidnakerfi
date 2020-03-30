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
