import { StyleSheet } from 'react-native';
import { appPrimaryColor } from '../../styles/style-config';

export default StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 60,
    backgroundColor: appPrimaryColor,
    flexDirection: 'row',
    paddingRight: 3,
    paddingLeft: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    backgroundColor: appPrimaryColor,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    backgroundColor: appPrimaryColor,
    alignSelf: 'flex-end',
  },
  iconPress: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 60,
  },
});
