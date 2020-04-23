import { StyleSheet } from 'react-native';
import {
  appPrimaryColor, appTextColor, appFont, appSecondaryColor,
} from '../../styles/style-config';

export default StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: appPrimaryColor,
    justifyContent: 'flex-start',
  },
  content: {
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'center',
    width: '80%',
    color: appTextColor,
    height: '80%',
  },
  userItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: appSecondaryColor,
    borderBottomWidth: 1,
  },
  itemUser: {
    padding: 10,
    fontFamily: appFont,
    flex: 1,
    fontSize: 23,
    backgroundColor: appPrimaryColor,
    textAlign: 'right',
  },
  userIcon: {
    fontSize: 200,
  },
  userDepartmentDesc: {
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontFamily: appFont,
    marginTop: '15%',
    fontSize: 23,
    borderBottomColor: appSecondaryColor,
    borderBottomWidth: 1,
  },
  centerItem: {
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontFamily: appFont,
    fontSize: 23,
  },
  itemDesc: {
    flex: 0,
    padding: 10,
    fontFamily: appFont,
    fontSize: 23,
  },
  changePW: {
    marginTop: 'auto',
    backgroundColor: appSecondaryColor,
    borderWidth: 2,
    borderRadius: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },
});
