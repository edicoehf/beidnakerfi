import { StyleSheet } from 'react-native';
import { appPrimaryColor, appTextColor } from '../../styles/style-config';

export default StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: appPrimaryColor,
    justifyContent: 'flex-start',

  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: appTextColor,
    backgroundColor: appPrimaryColor,
    minHeight: 80,

  },
});
