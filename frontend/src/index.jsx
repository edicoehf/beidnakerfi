import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App/App';


const theme = createMuiTheme({
  palette: {
    primary: { 500: '#990000' },
    secondary: { A400: '#6D6D6D' },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
