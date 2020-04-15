import { StyleSheet } from 'react-native';
import { appPrimaryColor, appTextColor } from '../../styles/colors';

export default StyleSheet.create({
  logoContainer: {
    paddingTop: 40,
    backgroundColor: appPrimaryColor,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 290,
  },
  edicoLogo: {
    height: 150,
    width: '90%',
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '100',
    color: appTextColor,
  },
});
