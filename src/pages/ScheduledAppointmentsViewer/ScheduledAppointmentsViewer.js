import React, {useContext, useState} from 'react';
import {useAppointmensSchedule} from '../../hooks/useAppointmentsSchedule';
import Firebase from '../../Firebase';
import Button from '@material-ui/core/Button/index';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import {Schedule} from '../../components/Schedule/Schedule';
import styled from 'styled-components';
import {Dialog} from '../../components/Dialog/Dialog';
import dayjs from 'dayjs';
import {Paper} from '../../components/Paper';
import {LoadingOverlay} from '../../components/LoadingOverlay/LoadingOverlay';
import {AuthContext} from '../../components/Routes/Routes';
import {ScheduleHelper} from '../../components/ScheduleHelper';

const PickerContainer = styled.div`
  display: flex;
`;

const getDialogText = (appointmentDetail, user) => {
  const date = dayjs(appointmentDetail.date.toDate());
  if (!user.admin) {
    return `Informações da consulta
    
      Data: ${date.format('DD/MM')}
      Horário: ${date.format('HH:mm')}
      
      Você pode cancelá-la no botão abaixo`
  }

  return `
  Informações da consulta
  
  Nome: ${appointmentDetail.name}
  Email: ${appointmentDetail.email}
  Telefone: ${appointmentDetail.phone}
  
  Data: ${date.format('DD/MM')}
  Horário: ${date.format('HH:mm')}
  
  Você pode cancelá-la no botão abaixo
  `

};


export const ScheduledAppointmentsViewer = () => {
  const {schedule, getLastWeek, getNextWeek, loading} = useAppointmensSchedule();
  const [appointmentDetail, setAppointmentDetail] = useState(undefined);
  const {user} = useContext(AuthContext);

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
    <ScheduleHelper>
      Suas consultas agendadas estão marcadas em azul abaixo. <br/>
      Clique em uma para ver as informações ou cancelá-la.
    </ScheduleHelper>
    <PickerContainer>
      {appointmentDetail &&
      <Dialog
        open={appointmentDetail}
        onClose={closeDialog}
        title={'Agendamento'}
        text={getDialogText(appointmentDetail, user)}
        actions={[
          <Button onClick={closeDialog}>Fechar</Button>,
          <Button onClick={onDelete}>Cancelar</Button>
        ]}
      />}
      <Button onClick={getLastWeek}><NavigateBefore/></Button>
      <Schedule schedule={schedule} onClickCell={onClickCell} isDisplay/>
      <Button onClick={getNextWeek}><NavigateNext/></Button>
    </PickerContainer>
  </Paper>;
};