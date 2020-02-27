import axios from 'axios';

//Example beiðni til að birta áður en við útfærum actual beiðnir.
const beidni = [
  {
    "cid": 1,
    "suid": 1,
    "did": 1,
    "date": "23.10.1995",
    "price": 100
  },
  {
    "cid": 1,
    "suid": 1,
    "did": 1,
    "date": "23.10.1995",
    "price": 100
  },
  {
    "cid": 1,
    "suid": 1,
    "did": 1,
    "date": "23.10.1995",
    "price": 100
  },
]

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

export const getChequeHistory = () => {
  const query = beidni
  return query;
}