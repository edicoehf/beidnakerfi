import * as constants from '../constants';

export const setUserInfo = (userInfo) => ({
  type: constants.USER_INFO, payload: { userInfo },
});

export default {
  setUserInfo,
};
