import React, {Fragment, useState} from 'react';
import styled from 'styled-components';
import {TableCell} from './TableCell';
import {TableColumn} from './TableColumn';
import {DayColumn} from './DayColumn';
import {Button} from '@material-ui/core';
import PropTypes from 'prop-types';

const WeekTable = styled.div`
  display: flex;
`;


export const SchedulePicker = ({schedule, setSchedule}) => {

  const toggleHour = (index) => (hour) => {
    const hourIndex = schedule[index].selectedHours.indexOf(hour);
    const newSchedule = [...schedule];
    const newSelectedHours = [...schedule[index].selectedHours];

    if (hourIndex > -1) {
      newSelectedHours.splice(hourIndex, 1);
    } else {
      newSelectedHours.push(hour);
    }

    newSchedule[index].selectedHours = newSelectedHours;

    setSchedule(newSchedule);
  };

  return <Fragment>
    <WeekTable>
      <TableColumn>
        <TableCell/>
        <TableCell text={'08h - 09h'}/>
        <TableCell text={'09h - 10h'}/>
        <TableCell text={'10h - 11h'}/>
        <TableCell text={'11h - 12h'}/>
        <TableCell text={'14h - 15h'}/>
        <TableCell text={'15h - 16h'}/>
        <TableCell text={'16h - 17h'}/>
        <TableCell text={'17h - 18h'}/>
      </TableColumn>

      {schedule.map((day, index) =>
        <DayColumn
          key={day.label}
          toggleHour={toggleHour(index)}
          day={day}
        />
      )}
    </WeekTable>
    <Button onClick={() => console.table(schedule)}>Salvar</Button>
  </Fragment>;
};

SchedulePicker.propTypes = {
  schedule: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    selectedHours: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  setSchedule: PropTypes.func.isRequired
};