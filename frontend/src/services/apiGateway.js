import axios from 'axios';
import * as service from './'



export const login =  async (userlogin) => {
  const query = await axios.post('http://localhost:8000/api/users/login/', {
        username: userlogin.username,
        password: userlogin.password,
    }).then((resp) => resp).catch(
      (e) => console.log(e)
    )
    console.log(query)
    if (!service.isEmpty(query)) return query;
    else return false;
}
