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

export const getUsers = async (page, searchString) => {
  const query = await axios
    .get(`${API_URL}/api/users/?search=${searchString}&limit=10&offset=${page * 10}`, {
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
      headers: {
        authorization: getKey(),
      },

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
    username, password, email, department, deptManager,
  } = newUser;
  const OrgID = getOrgId();
  const APIKEY = getKey();
  const query = await axios
    .post(`${API_URL}/api/users/`, {
      username,
      password,
      email,
      organization: OrgID,
      is_manager: deptManager,
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

export const updateUser = async (user) => {
  const { id, email, username } = user;
  const APIKEY = getKey();
  const query = await axios
    .patch(`${API_URL}/api/users/${id}/`, {
      email,
      username,
    }, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp.data)
    .catch((e) => e.response);
  return query;
};

export const changeUserPassword = async (id, password) => {
  const APIKEY = getKey();
  const query = await axios
    .put(`${API_URL}/api/users/${id}/set_password/`, {
      old_password: '',
      new_password: password,
    }, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);

  return query;
};

export const deactivateUser = async (id) => {
  const APIKEY = getKey();
  await axios
    .post(`${API_URL}/api/users/${id}/deactivate/`, {},
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
};

export const activateUser = async (id) => {
  const APIKEY = getKey();
  await axios
    .post(`${API_URL}/api/users/${id}/activate/`, {}, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.repsonse);
};

/*
  DEPARTMENTS
    [GET] / - GET ALL DEPARTMENTS                 DONE
    [POST] / - CREATE NEW DEPARTMENT              DONE
    [GET] /id - GET SPECIFIC DEPARTMENT           DONE
    [PATCH] /id - UPDATE SPECIFIC DEPARTMENT
    [DELETE] /id - DELETE EXISTING USER           DONE
*/

export const getDepartments = async () => {
  const userId = JSON.parse(localStorage.getItem('tokens')).id;
  const query = await getUser(userId);
  return query.data.departments;
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
      costsite,
      name,
    }, {
      headers: {
        authorization: APIKEY,
      },
    })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const disableDepartment = async (id) => {
  const APIKEY = getKey();
  const query = await axios
    .delete(`${API_URL}/api/departments/${id}/`, {},
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

const convertDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleString('en-GB');
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
    .then((resp) => {
      const { created } = resp.data;
      const readableDate = convertDate(created);

      const newData = { ...resp, created: readableDate };

      return newData;
    })
    .catch((e) => e.response);
  return query;
};

export const updateCheque = async (cheque) => {
  const APIKEY = getKey();
  const { itemDescription, itemPrice, key } = cheque;
  const query = await axios
    .patch(`${API_URL}/api/cheques/${key}/`,
      {
        description: itemDescription,
        price: itemPrice,
      }, {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const markAsPaid = async (code) => {
  const APIKEY = getKey();
  const query = await axios
    .patch(`${API_URL}/api/cheques/${code}/`,
      {
      }, {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const getCheques = async (page, searchString) => {
  const APIKEY = getKey();
  const query = await axios
    .get(`${API_URL}/api/cheques/?search=${searchString}&limit=10&offset=${page * 10}`,
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp)
    .catch((e) => e.response);
  return query;
};

export const getChequesByDepartmentId = async () => {
  const APIKEY = getKey();
  // const depIDs = getDepIDs();
  const orgId = getOrgId();
  const query = await axios
    .get(`${API_URL}/api/organizations/${orgId}/cheques/`,
      {
        headers: {
          authorization: APIKEY,
        },
      })
    .then((resp) => resp.data)
    .catch((e) => e.response);

  return query;
};

export const deleteCheque = async (chequePK) => {
  const APIKEY = getKey();
  const query = axios.delete(`${API_URL}/api/cheques/${chequePK}/`, {
    headers: {
      authorization: APIKEY,
    },
  }).then((resp) => resp.data)
    .catch((e) => e.response);
  return query;
};
