import React from 'react';
import {TableColumn} from './TableColumn';
import {TableCell} from './TableCell';
import PropTypes from 'prop-types';

export const DayColumn = ({day, onClick, isDisplay, isPicker}) => {
  const possibleHours = [8, 9, 10, 11, 14, 15, 16, 17];

  const getStateForHour = (hour) => {
    const selected = day.selectedHours.includes(hour);

    if (isDisplay && selected) {
      return 'SCHEDULED'
    }

    if (isDisplay) {
      return
    }

    if (selected) {
      return 'AVAILABLE';
    }

    if (isPicker) {
      return
    }

    return 'UNSELECTED';
  };

  return <TableColumn>
    <TableCell text={day.label}/>
    {possibleHours.map((hour) =>
      <TableCell
        key={hour}
        selected={day.selectedHours.includes(hour)}
        clickable={!!getStateForHour(hour)}
        state={getStateForHour(hour)}
        onClick={() => onClick(hour)}
      />
    )}
  </TableColumn>
};

DayColumn.propTypes = {
  day: PropTypes.object,
};