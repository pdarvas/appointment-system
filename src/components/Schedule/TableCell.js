import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TableCellContainer = styled.div`
  height: 50px;
  border: 0.1px solid rgba(204,204,204,0.51);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
  ${(props) => getCSSForCellState(props.state)}
`;

const getCSSForCellState = (state) => {
  switch (state) {
    case 'UNSELECTED':
      return `&:hover {
        background-color: rgba(42,176,0,0.55);
      }
      &:active {
        background-color: rgb(31,109,0);
      }`;
    case 'AVAILABLE':
      return `background-color: #2AB000;
      &:hover {
        background-color: rgba(42,176,0,0.55);
      }
      &:active {
        background-color: rgb(31,109,0);
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