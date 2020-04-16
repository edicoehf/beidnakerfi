import { StyleSheet } from 'react-native';
import { appPrimaryColor, appSecondaryColor } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: appPrimaryColor,
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  timeText: {
    fontSize: 80,
  },
  timebox: {
    borderRadius: 15,
    width: '40%',
    height: '40%',
    backgroundColor: appSecondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
