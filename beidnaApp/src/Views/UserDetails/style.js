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
    paddingTop: 25,
    marginTop: '15%',
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'center',
    width: '80%',
    color: appTextColor,
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
    marginTop: 100,
    fontSize: 23,
    borderBottomColor: appSecondaryColor,
    borderBottomWidth: 1,
  },
  departmentItem: {
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontFamily: appFont,
    fontSize: 23,
  },
  itemDesc: {
    padding: 10,
    fontFamily: appFont,
    fontSize: 23,
  },
  userItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: appSecondaryColor,
    borderBottomWidth: 1,
  },
});
