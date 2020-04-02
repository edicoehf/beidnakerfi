// Models
import * as constants from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case constants.USER_INFO: return action.payload;
    default: return state;
  }
}
