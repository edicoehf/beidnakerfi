import * as constants from '../constants';

export const setUserInfo = async (userInfo) => ({
  type: constants.USER_INFO, payload: { userInfo },
});

export default {
  setUserInfo,
};
