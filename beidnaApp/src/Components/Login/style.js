import { StyleSheet } from 'react-native';
import {
  appPrimaryColor, appButtonColor, appButtonTextColor, appTextColor, appFont,
} from '../../styles/style-config';

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
    fontFamily: appFont,
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
    fontSize: 32,
    fontFamily: appFont,
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
