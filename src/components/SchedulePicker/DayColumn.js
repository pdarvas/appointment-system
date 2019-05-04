import React from 'react';
import {TableColumn} from './TableColumn';
import {TableCell} from './TableCell';
import PropTypes from 'prop-types';

export const DayColumn = ({day, toggleHour}) => {
  const possibleHours = [8, 9, 10, 11, 14, 15, 16, 17];

  return <TableColumn>
    <TableCell text={day.label}/>
    {possibleHours.map((hour) =>
      <TableCell
        key={hour}
        selected={day.selectedHours.includes(hour)}
        clickable
        onClick={() => toggleHour(hour)}
      />
    )}
  </TableColumn>
};

DayColumn.propTypes = {
  day: PropTypes.object,
};