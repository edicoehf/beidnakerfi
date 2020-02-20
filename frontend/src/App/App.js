import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import { useRoutes } from 'hookrouter'

import reducers from '../reducers';
import Routes from '../Routes'

function App() {
  const routeResult = useRoutes(Routes);
  return (
    <Provider store={createStore(reducers)}>
      {
        routeResult
      }
    </Provider>
  );
}

export default App;
