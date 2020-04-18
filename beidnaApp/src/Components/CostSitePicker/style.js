import { StyleSheet } from 'react-native';
import {
  appPrimaryColor, appButtonColor, appButtonTextColor, appSecondaryColor, appTextColor, appFont,
} from '../../styles/style-config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appPrimaryColor,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: appButtonColor,
    minHeight: 80,
    borderRadius: 10,
    width: '100%',
  },
  buttonTitle: {
    color: appButtonTextColor,
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: appFont,
  },
  overlay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 500,
  },
  defaultPick: {
    flex: 0,
    flexDirection: 'row',
    margin: 15,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: '80%',
    minHeight: 30,
    borderBottomWidth: 1,
    borderBottomColor: appSecondaryColor,
  },
  oneCostsite: {
    flex: 0,
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80%',
    minHeight: 30,
    borderBottomWidth: 1,
    borderBottomColor: appSecondaryColor,
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
