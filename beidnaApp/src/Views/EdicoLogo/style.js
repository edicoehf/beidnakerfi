import { StyleSheet } from 'react-native';
import { appPrimaryColor, appTextColor, appFont } from '../../styles/style-config';

export default StyleSheet.create({
  logoContainer: {
    backgroundColor: appPrimaryColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 250,
  },
  edicoLogo: {
    height: 125,
    width: '80%',
  },
  logoText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto',
    width: '100%',
    color: appTextColor,
  },
  font: {
    fontFamily: appFont,
  },
});
