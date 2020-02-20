const axios = require('axios').default;


export const login =  async (userlogin) => {
    const  query = await axios.post('http://localhost:8000/api/users/login/', {
        username: userlogin.username,
        password: userlogin.password,
    }).then((resp) => resp).catch(
      (e) => /* eslint-disable */ console.log(e) /* eslint-enable */
    )
    return query
}
