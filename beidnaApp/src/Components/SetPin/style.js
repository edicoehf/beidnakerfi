import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pinContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:220,
    alignItems: 'center',
  },
  inputField: {

    maxWidth: '80%',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  inputText: {
    color: 'black',
    fontSize: 15,
  },
  buttonGroup: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#8D8D8D',
    minHeight: 80,
    minWidth: 80,
    borderRadius: 50,

  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },

});
