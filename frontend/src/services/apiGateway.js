import axios from 'axios';

require('dotenv').config();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const getKey = () => `Token ${JSON.parse(localStorage.getItem('tokens')).token}`;

const getOrgId = () => JSON.parse(localStorage.getItem('tokens')).org_id;
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
    .post(`${API_URL}/api/login/`, {
      username: userlogin.username,
      password: userlogin.password,
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const getUsers = async () => {
  const query = await axios
    .get(`${API_URL}/api/users/`, {
      headers: {
        authorization: getKey(),
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const getUser = async (id) => {
  const query = await axios
    .get(`${API_URL}/api/users/${id}/`, {
      method: 'GET',

    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

const addUserToDepartment = async (userId, deptId) => {
  const APIKEY = getKey();
  const query = await axios
    .post(`${API_URL}/api/departments/${deptId}/add_user/`, {
      user: userId,
    }, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);

  return query;
};

export const createUser = async (newUser) => {
  const {
    username, password, email, department,
  } = newUser;
  const OrgID = getOrgId();
  const APIKEY = getKey();

  const query = await axios
    .post(`${API_URL}/api/users/`, {
      username,
      password,
      email,
      organization: OrgID,
    }, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);

  if (department) {
    const { id } = query.data;
    const userAddedToDepartment = await addUserToDepartment(id, department);
    return userAddedToDepartment;
  }

  return query;
};


export const disableUser = async (id) => {
  const APIKEY = getKey();
  const query = await axios
    .delete(`${API_URL}/api/users/${id}/`,
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
  const OrgID = getOrgId();
  const APIKEY = getKey();

  const query = await axios
    .get(`${API_URL}/api/organizations/${OrgID}/departments/`, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const getDepartment = async (id) => {
  const APIKEY = getKey();
  const query = await axios
    .get(`${API_URL}/api/departments/${id}/`, {
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
  const APIKEY = getKey();

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
  const APIKEY = getKey();
  const query = await axios
    .delete(`${API_URL}/api/departments/${id}/`,
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};


export const getCheque = async (id) => {
  const APIKEY = getKey();
  const query = await axios
    .get(`${API_URL}/api/cheques/${id}/`,
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};
