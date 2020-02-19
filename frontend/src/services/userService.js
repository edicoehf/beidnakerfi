const axios = require('axios').default;


export const getUsers = () => {
    axios.get('http://localhost:8000/api/user')
        .then(data => {
            return data;
        })
}

