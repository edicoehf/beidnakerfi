// Models
import * as constants from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case constants.LOGIN_USER:
     return action.payload;
    default: return state;
  }
}
