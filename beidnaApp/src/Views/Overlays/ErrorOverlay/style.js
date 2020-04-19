import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 120,
  },
  closeModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
  },
  modalText: {
    flex: 4,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
});
