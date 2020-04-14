import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#8D8D8D',
    minHeight: 100,
    borderRadius: 10,
    width: '80%',
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
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#8D8D8D',
  },
  listItem: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80%',
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#8D8D8D',
  },
  downArrow: {
    fontSize: 30,
    marginLeft: 'auto',
  },
  costsiteText: {
    fontSize: 30,
  },
  selected: {
    fontSize: 30,
    color: '#8D8D8D',
  },

});
