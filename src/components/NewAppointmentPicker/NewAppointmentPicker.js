import React, {Fragment, useState} from 'react';
import {Schedule} from '../Schedule/Schedule';
import {useAppointmensSchedule} from '../../hooks/useAppointmentsSchedule';
import Button from '@material-ui/core/Button';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import styled from 'styled-components';
import {ConfirmationDialog} from './ConfirmationDialog';
import Firebase from '../../Firebase';
import {Dialog} from '../Dialog/Dialog';
import {useFreeSlots} from '../../hooks/useFreeSlots';

const PickerContainer = styled.div`
  display: flex;
`;

export const NewAppointmentPicker = () => {
  const {schedule, getLastWeek, getNextWeek} = useFreeSlots();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(undefined);

  const createAppointment = (time) => {
    Firebase.createAppointment(time)
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
    <Dialog
      open={confirmationOpen}
      onClose={closeConfirmation}
      title={'Criar Agendamento'}
      text={`Tem certeza que deseja criar um agendamento no dia ${selectedTime.format('DD/MM')},
        às ${selectedTime.format('HH:mm')}?`}
      actions={[
        <Button onClick={closeConfirmation}>Cancelar</Button>,
        <Button onClick={onConfirm}>Confirmar</Button>
      ]}
    />}
    <Button onClick={getLastWeek}><NavigateBefore/></Button>
    <Schedule schedule={schedule} onClickCell={onClickCell} isPicker/>
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