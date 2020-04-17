import { StyleSheet } from 'react-native';
import {
  appPrimaryColor, appButtonColor, appButtonTextColor, appTextColor, appFont,
} from '../../styles/style-config';

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
    fontFamily: appFont,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: appButtonTextColor,
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: appFont,
  },
  icon: {
    color: appButtonTextColor,
    fontWeight: 'bold',
    fontSize: 28,
  },

});
