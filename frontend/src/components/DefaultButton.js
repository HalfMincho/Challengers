import React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';

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
