// Models
import * as constants from '../constants';

export default function (state = 'Home', action) {
  switch (action.type) {
    case constants.SWITCH_PAGE:
      return action.payload;
    default:
      return state;
  }
}
