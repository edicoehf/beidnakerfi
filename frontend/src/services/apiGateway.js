const axios = require('axios').default;


export const login =  async (userlogin) => {
    const  query = await axios.post('http://localhost:8000/api/users/login/', {
        username: userlogin.username,
        password: userlogin.password,
    }).then((resp) => resp).catch(
      (e) => console.log(e)
    )
    return query
}
