import { StyleSheet } from 'react-native';
import { appSecondaryColor, appFont } from '../../../styles/style-config';

export default StyleSheet.create({
  overlay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 500,
  },
  listItem: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    minWidth: '80%',
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: appSecondaryColor,
  },
  rightMark: {
    fontSize: 30,
    marginLeft: 'auto',
    fontFamily: appFont,
  },
  costsiteText: {
    fontSize: 30,
    fontFamily: appFont,
  },
});
