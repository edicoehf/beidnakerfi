import { StyleSheet } from 'react-native';
import { appSecondaryColor } from '../../../styles/style-config';

export default StyleSheet.create({
  overlay: {
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 330,
    maxHeight: 330,
  },
  closeModal: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    width: '100%',
    marginBottom: 10,
  },
  changePW: {
    marginBottom: 10,
    marginTop: 'auto',
    backgroundColor: appSecondaryColor,
    borderWidth: 2,
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  redText: {
    color: 'red',
  },
  checkIcon: {
    fontSize: 200,
  },
  iconPress: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
});
