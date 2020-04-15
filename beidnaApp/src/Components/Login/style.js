import { StyleSheet } from 'react-native';
import {
  appPrimaryColor, appButtonColor, appButtonTextColor, appTextColor,
} from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: appPrimaryColor,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: appPrimaryColor,
    justifyContent: 'flex-start',
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
  },
  button: {
    backgroundColor: appButtonColor,
    minHeight: 80,
    borderRadius: 10,
    width: '100%',
  },
  buttonTitle: {
    color: appButtonTextColor,
    fontWeight: 'bold',
    fontSize: 32,
  },

});
