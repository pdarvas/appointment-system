import React, {Fragment, useState} from 'react';
import {Schedule} from '../Schedule/Schedule';
import {useAvailableHoursSchedule} from '../../hooks/useAvailableHoursSchedule';
import Button from '@material-ui/core/Button';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import styled from 'styled-components';
import {ConfirmationDialog} from './ConfirmationDialog';
import Firebase from '../../Firebase';

const PickerContainer = styled.div`
  display: flex;
`;

export const NewAppointmentPicker = () => {
  const {schedule, setSchedule, getLastWeek, getNextWeek, refresh} = useAvailableHoursSchedule();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(undefined);

  const createAppointment = (time) => {
    Firebase.createAppointment({time: time.toDate()}).then(refresh);
  };

  const onClickCell = (day) => (hour) => {
    setSelectedTime(day.hour(hour));
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
    setSelectedTime(undefined);
  };

  const onConfirm = () => {
    createAppointment(selectedTime);
    closeConfirmation()
  };


  return <PickerContainer>
    {confirmationOpen &&
    <ConfirmationDialog
      confirmationOpen={confirmationOpen}
      closeConfirmation={closeConfirmation}
      selectedTime={selectedTime}
      onConfirm={onConfirm}
    />}
    <Button onClick={getLastWeek}><NavigateBefore/></Button>
    <Schedule setSchedule={setSchedule} schedule={schedule} onClickCell={onClickCell}/>
    <Button onClick={getNextWeek}><NavigateNext/></Button>
  </PickerContainer>
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