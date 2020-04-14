import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../Components/Login';
import SetPin from '../Components/SetPin';
import Landing from '../Views/Landing';
import NewCheque from '../Views/NewCheque';

const StackNavigator = createStackNavigator(
  {
    Login,
    Landing,
    SetPin,
    NewCheque,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      headerTintColor: '#981800',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(StackNavigator);
