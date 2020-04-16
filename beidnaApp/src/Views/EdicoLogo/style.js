import { StyleSheet } from 'react-native';
import { appPrimaryColor, appTextColor } from '../../styles/colors';

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
    width: '70%',
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '100',
    color: appTextColor,
  },
});
