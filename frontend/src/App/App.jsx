// Dependencies
import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Source from us
import { CssBaseline } from '@material-ui/core';
import Routes from '../Routes';

// Service
function App() {
  const theme = createMuiTheme({
    palette: {
      primary: { 500: '#990000' },
      secondary: { A400: '#6D6D6D' },
    },
  });

  console.log('in App');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
