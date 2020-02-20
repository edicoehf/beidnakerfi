// Models
import * as constants from '../constants';
import * as service from '../services'

export default function (state = [], action) {
  switch (action.type) {
    case constants.LOGIN_USER: return !service.undefinedCheck(action.payload) ? action.payload : state;
    default: return state;
  }
}
