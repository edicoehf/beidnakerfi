import { StyleSheet } from 'react-native';
import { appPrimaryColor, appSecondaryColor, appFont } from '../../styles/style-config';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: appPrimaryColor,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 30,
    fontFamily: appFont,
  },
  timebox: {
    borderRadius: 15,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
