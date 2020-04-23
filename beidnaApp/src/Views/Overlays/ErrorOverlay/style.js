import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 120,
  },
  closeModal: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modalText: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  iconPress: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
