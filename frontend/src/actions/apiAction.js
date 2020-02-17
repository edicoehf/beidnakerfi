import * as constants from '../constants';
import { getToken } from '../service/ApiGateway';

export const updateTokenAction = async () => getToken().then(
  (newToken) => ({ type: constants.UPDATE_TOKEN, payload: { timer: new Date(), token: newToken } }),
).catch((e) => /* eslint-disable */ console.log(e) /* eslint-enable */);

export default {
  updateTokenAction,
};
