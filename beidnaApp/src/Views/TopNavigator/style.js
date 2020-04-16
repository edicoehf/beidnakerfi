import { StyleSheet } from 'react-native';
import { appPrimaryColor } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 70,
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
    height: 70,
    borderRadius: 50,
    width: 70,
  },
  right: {
    backgroundColor: appPrimaryColor,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    borderRadius: 50,
    width: 70,
  },
});
