import * as constants from '../constants';
import { login } from '../services/apiGateway';

export const loginUser = async (userInfo) => login(userInfo).then(
  (userInfo) => ({ type: constants.LOGIN_USER, payload: { userInfo } }),
).catch((e) => /* eslint-disable */ console.log(e) /* eslint-enable */);

export default {
  loginUser,
};
