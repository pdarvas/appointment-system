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
  
  ${(props) => props.clickable && !props.selected &&
  `&:hover {
    background-color: #b7ffb5;
  }`}
  ${(props) => props.clickable &&
  `&:active {
    background-color: #229218;
  }`}
  
`;

export const TableCell = (props) => {
  const onCellClick = () => {
    if (props.clickable) {
      props.onClick()
    }
  };

  return <TableCellContainer
    onClick={onCellClick}
    selected={props.selected}
    clickable={props.clickable}
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