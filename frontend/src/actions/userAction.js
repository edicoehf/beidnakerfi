import * as constants from '../constants';

export const loginUser = async (userInfo) => ({ type: constants.LOGIN_USER, payload: userInfo });


export default {
  loginUser,
};
