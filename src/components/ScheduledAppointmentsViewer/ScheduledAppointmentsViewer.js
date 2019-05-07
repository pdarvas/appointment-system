import React, {useState} from 'react';
import {useAppointmensSchedule} from '../../hooks/useAppointmentsSchedule';
import Firebase from '../../Firebase';
import Button from '@material-ui/core/Button';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import {Schedule} from '../Schedule/Schedule';
import styled from 'styled-components';
import {Dialog} from '../Dialog/Dialog';
import dayjs from 'dayjs';
import {Paper} from '../Paper';
import {LoadingOverlay} from '../LoadingOverlay/LoadingOverlay';

const PickerContainer = styled.div`
  display: flex;
`;

export const ScheduledAppointmentsViewer = () => {
  const {schedule, getLastWeek, getNextWeek, loading} = useAppointmensSchedule();
  const [appointmentDetail, setAppointmentDetail] = useState(undefined);

  const getUserForAppointment = (appointment) => {
    Firebase.getUser(appointment.user).then(user => {
      setAppointmentDetail({...appointment, ...user})
    })
  };

  const onClickCell = (day) => (hour) => {
    Firebase.getAppointmentDetailByTime(day.hour(hour))
      .then(getUserForAppointment);
  };

  const closeDialog = () => {
    setAppointmentDetail(undefined);
  };

  const onDelete = () => {
    Firebase.deleteAppointment(appointmentDetail.id);
    closeDialog();
  };

  return loading ? <LoadingOverlay/> : <Paper>
    <PickerContainer>
      {appointmentDetail &&
      <Dialog
        open={appointmentDetail}
        onClose={closeDialog}
        title={'Agendamento'}
        text={`Data: ${dayjs(appointmentDetail.date.toDate()).format('DD:MM')}
      Horário: ${dayjs(appointmentDetail.date.toDate()).format('HH:mm')}`}
        actions={[
          <Button onClick={closeDialog}>Fechar</Button>,
          <Button onClick={onDelete}>Excluir</Button>
        ]}
      />}
      <Button onClick={getLastWeek}><NavigateBefore/></Button>
      <Schedule schedule={schedule} onClickCell={onClickCell} isDisplay/>
      <Button onClick={getNextWeek}><NavigateNext/></Button>
    </PickerContainer>
  </Paper>;
};