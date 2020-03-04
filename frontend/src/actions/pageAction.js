import * as constants from '../constants';

export const switchPage = (nextPage) => ({ type: constants.SWITCH_PAGE, payload: nextPage });

export default {
  switchPage,
};
