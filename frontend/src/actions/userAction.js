import * as constants from '../Constants';

export const loginUser = async (userInfo) => ({ type: constants.LOGIN_USER, payload: userInfo  })


export default {
  loginUser,
};
