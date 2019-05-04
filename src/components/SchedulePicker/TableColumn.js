import React from 'react';
import styled from 'styled-components';

const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
`;

export const TableColumn = (props) => {
  return <DayColumn>{props.children}</DayColumn>
};