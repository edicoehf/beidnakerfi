import { StyleSheet } from 'react-native';
import { appPrimaryColor, appTextColor } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    color: appTextColor,
    backgroundColor: appPrimaryColor,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appPrimaryColor,
    minHeight: 80,
  },
});
