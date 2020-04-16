import { StyleSheet } from 'react-native';
import {
  appPrimaryColor, appButtonColor, appButtonTextColor, appTextColor,
} from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: appPrimaryColor,
  },
  loginContainer: {
    flex: 2,
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
    marginTop: 15,
    minHeight: 80,
    borderRadius: 10,
    width: '100%',
  },
  buttonTitle: {
    color: appButtonTextColor,
    fontWeight: 'bold',
    fontSize: 32,
  },
  overlay: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 120,
  },
  closeModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  modalText: {
    flex: 4,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },

});
