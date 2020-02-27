import axios from 'axios';



export const login =  async (userlogin) => {
  const query = await axios.post('http://localhost:8000/api/users/login/', {
        username: userlogin.username,
        password: userlogin.password,
    }).then((resp) => resp).catch(
      (e) => {
        console.log(e.response)
        return e.response
      }
    )
    return query;
}
