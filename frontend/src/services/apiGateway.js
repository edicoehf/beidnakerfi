import axios from 'axios';

// MUNA AÐ BREYTA ÞESSU!!!!!!
const APIKEY = 'ApiKey emil:6bf8d753301d5948441cfc556d562c523508940b';


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
    .post('http://localhost:8000/api/users/login/', {
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
    .get(`http://localhost:8000/api/organizations/${orgId}/`, {
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
    .get(`http://localhost:8000/api/users/${id}`, {
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
    .post('http://localhost:8000/api/users/', {
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
    .delete(`http://localhost:8000/api/users/${id}`,
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
    .get('http://localhost:8000/api/departments/', {
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
    .get(`http://localhost:8000/api/departments/${id}`, {
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
    .post('http://localhost:8000/api/departments/', {
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
    .delete(`http://localhost:8000/api/departments/${id}`,
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};
