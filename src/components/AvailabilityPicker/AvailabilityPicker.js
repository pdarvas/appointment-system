import React, {Fragment, useState} from 'react';
import {Schedule} from '../Schedule/Schedule';
import Button from '@material-ui/core/Button';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import styled from 'styled-components';
import Firebase from '../../Firebase';
import {useFreeSlots} from '../../hooks/useFreeSlots';
import {Paper} from '../Paper';
import {LoadingOverlay} from '../LoadingOverlay/LoadingOverlay';

const PickerContainer = styled.div`
  display: flex;
`;

export const AvailabilityPicker = () => {
  const {schedule, getLastWeek, getNextWeek, loading} = useFreeSlots();

  const onClickCell = (day) => (hour) => {
    Firebase.toggleSlotByTime(day.hour(hour));
  };

  return loading ? <LoadingOverlay/> :  <Paper>
    <PickerContainer>
      <Button onClick={getLastWeek}><NavigateBefore/></Button>
      <Schedule schedule={schedule} onClickCell={onClickCell}/>
      <Button onClick={getNextWeek}><NavigateNext/></Button>
    </PickerContainer>
  </Paper>;
};

// const onClickCell = (day) => (hour) => {
//   const hourIndex = schedule[day].selectedHours.indexOf(hour);
//   const newSchedule = [...schedule];
//   const newSelectedHours = [...schedule[day].selectedHours];
//
//   if (hourIndex > -1) {
//     newSelectedHours.splice(hourIndex, 1);
//   } else {
//     newSelectedHours.push(hour);
//   }
//
//   newSchedule[day].selectedHours = newSelectedHours;
//
//   setSchedule(newSchedule);
// };