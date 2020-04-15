import { StyleSheet } from 'react-native';
import {
  appPrimaryColor, appButtonColor, appButtonTextColor, appTextColor,
} from '../../styles/colors';

export default StyleSheet.create({
  pinContainer: {
    flex: 1,
    backgroundColor: appPrimaryColor,
    paddingTop: 220,
    alignItems: 'center',
  },
  inputField: {

    maxWidth: '80%',
    marginBottom: 10,
    backgroundColor: appPrimaryColor,
    borderRadius: 10,
  },
  inputText: {
    color: appTextColor,
    fontSize: 15,
  },
  buttonGroup: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: appButtonColor,
    minHeight: 80,
    minWidth: 80,
    borderRadius: 50,

  },
  buttonTitle: {
    color: appButtonTextColor,
    fontWeight: 'bold',
    fontSize: 32,
  },

});
