import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TableCellContainer = styled.div`
  height: 50px;
  width: 100%;
  border: 1px solid #cccccc;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
  background-color: ${(props) => props.selected ? '#69CC5E' : 'white'};
  
  ${(props) => getCSSForCellState(props.state)}
`;

const getCSSForCellState = (state) => {
  switch (state) {
    case 'UNSELECTED':
      return `&:hover {
        background-color: #b7ffb5;
      }
      &:active {
        background-color: #229218;
      }`;
    case 'AVAILABLE':
      return `background-color: #69CC5E;
      &:hover {
        background-color: #b7ffb5;
      }
      &:active {
        background-color: #229218;
      }`;
    case 'SCHEDULED':
      return `background-color: #6181CC;
      &:hover {
        background-color: #3863CC;
      }
      &:active {
        background-color: #164CCC;
      }`;
    default:
      return ''
  }
};

export const TableCell = (props) => {
  const onCellClick = () => {
    if (props.clickable) {
      props.onClick()
    }
  };

  return <TableCellContainer
    onClick={onCellClick}
    state={props.state}
  >
    {props.text}
  </TableCellContainer>
};

TableCell.propTypes = {
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  text: PropTypes.string,
};