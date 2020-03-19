import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = async (userlogin) => {
  console.log(userlogin.username)
  const query = await axios.post(`${API_URL}/api/login/`, {
      username: userlogin.username,
      password: userlogin.password,
    })
    .then((resp) => {
      console.log('bb' + resp);
      return resp
    })
    .catch((e) => e.response);
    console.log('aa' + query)
  return query;
};
