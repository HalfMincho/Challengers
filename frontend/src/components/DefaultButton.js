import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF3257',
    },
    neutral: {
      main: '#595959',
    },
  },
});

const DefaultButton = ({ color, size, text, variant }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button color={color} size={size} variant={variant}>
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default DefaultButton;
