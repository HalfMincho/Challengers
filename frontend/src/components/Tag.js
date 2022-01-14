import React from 'react';
import styled from 'styled-components';

const TagItem = styled.span`
  background: #f1f3f5;
  margin-right: 10px;
  padding: 3px 5px;
  font-size: 0.9em;
  border-radius: 5px;
`;

const Tag = ({ text }) => {
  return <TagItem>{text}</TagItem>;
};

export default Tag;
