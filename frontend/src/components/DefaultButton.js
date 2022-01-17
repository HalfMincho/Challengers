import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  width: 5em;
  height: 5em;
  background: ${(props) => props.color};
`;

const DefaultButton = ({ color, size, text, variant }) => {
  return (
    <Button color={color} size={size} variant={variant}>
      {text}
    </Button>
  );
};

export default DefaultButton;
