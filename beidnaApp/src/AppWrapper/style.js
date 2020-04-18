import { StyleSheet } from 'react-native';
import { appPrimaryColor, appFont } from '../styles/style-config';

export default StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 20,
    backgroundColor: appPrimaryColor,
  },
  font: {
    fontFamily: appFont,
  },
});
