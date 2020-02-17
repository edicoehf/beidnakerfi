import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

import reducers from '../../reducers';
import LoginForm from '../LoginForm/LoginForm';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'

function App() {
  return (
    <Provider store={createStore(reducers)}>
      <Navbar />
      <LoginForm />
      <Footer />
    </Provider>
  );
}

export default App;