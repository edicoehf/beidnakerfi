import axios from 'axios';

require('dotenv').config()

let API_URL;

if(process.env === 'production'){
  API_URL = process.env.REACT_APP_API_URL
} else {
  API_URL =  'http://localhost:8000';
}

// MUNA AÐ BREYTA ÞESSU!!!!!!
const APIKEY = process.env.REACT_APP_API_KEY;


/*
  USERS
    [GET] / - GET ALL USERS                   DONE
    [POST] / - CREATE NEW USER                DONE
    [GET] /id - GET SPECIFIC USER             DONE
    [PATCH] /id - UPDATE SPECIFIC USER
    [PUT] /id - UPDATE OR CREATE NEW USER
    [DELETE] /id - DELETE EXISTING USER       DONE
    [POST] /login SEND LOGIN REQUEST          DONE
*/


export const login = async (userlogin) => {
  const query = await axios
    .post(`${API_URL}/api/users/login/`, {
      username: userlogin.username,
      password: userlogin.password,
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};


export const getUsers = async () => {
  // eslint-disable-next-line camelcase
  const { org_id: orgId } = await JSON.parse(localStorage.getItem('tokens'));
  const query = await axios
    .get(`${API_URL}/api/organizations/${orgId}/`, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const getUser = async (id) => {
  const query = await axios
    .get(`${API_URL}/api/users/${id}`, {
      method: 'DELETE',

    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const createUser = async (newUser) => {
  const {
    username, password, email, organizationId,
  } = newUser;

  const query = await axios
    .post(`${API_URL}/api/users/`, {
      username,
      password,
      email,
      org_id: organizationId,
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const disableUser = async (id) => {
  const query = await axios
    .delete(`${API_URL}/api/users/${id}`,
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

/*
  DEPARTMENTS
    [GET] / - GET ALL DEPARTMENTS                 DONE
    [POST] / - CREATE NEW DEPARTMENT              DONE
    [GET] /id - GET SPECIFIC DEPARTMENT           DONE
    [PATCH] /id - UPDATE SPECIFIC DEPARTMENT
    [PUT] /id - UPDATE OR CREATE NEW DEPARTMENT
    [DELETE] /id - DELETE EXISTING USER           DONE
*/

export const getDepartments = async () => {
  const query = await axios
    .get(`${API_URL}/api/departments/`, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const getDepartment = async (id) => {
  const query = await axios
    .get(`${API_URL}/api/departments/${id}`, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const createDepartment = async (newDepartment) => {
  const { costsite, name } = newDepartment;

  const query = await axios
    .post(`${API_URL}/api/departments/`, {
      headers: {
        authorization: APIKEY,
      },
      costsite,
      name,


    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const disableDepartment = async (id) => {
  const query = await axios
    .delete(`${API_URL}/api/departments/${id}`,
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};
