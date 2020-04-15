import { StyleSheet } from 'react-native';
import { appPrimaryColor, appTextColor } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    backgroundColor: appPrimaryColor,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: appPrimaryColor,
    minHeight: 80,
  },
  costsite: {
    fontSize: 30,
    color: appTextColor,
    paddingBottom: 20,
  },
});
