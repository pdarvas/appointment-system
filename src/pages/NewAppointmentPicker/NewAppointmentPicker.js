import React, {useContext, useState} from 'react';
import {Schedule} from '../../components/Schedule/Schedule';
import Button from '@material-ui/core/Button/index';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import styled from 'styled-components';
import Firebase from '../../Firebase';
import {Dialog} from '../../components/Dialog/Dialog';
import {Paper} from '../../components/Paper';
import {LoadingOverlay} from '../../components/LoadingOverlay/LoadingOverlay';
import {useFreeSlotsForWeek} from '../../hooks/useFreeSlotsForWeek';
import {AuthContext} from '../../components/Routes/Routes';

const PickerContainer = styled.div`
  display: flex;
`;

export const NewAppointmentPicker = (props) => {
  const {schedule, getLastWeek, getNextWeek, loading} = useFreeSlotsForWeek();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const {user} = useContext(AuthContext);

  const onClickCell = (day) => (hour) => {
    setSelectedTime(day.hour(hour).minute(0));
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
    setSelectedTime(undefined);
  };

  const onConfirm = () => {
    Firebase.createAppointment(selectedTime, user.id).then(() => {
      props.history.push('/user/schedule')
    });
    closeConfirmation();
  };

  return loading ? <LoadingOverlay/> : <Paper>
    <PickerContainer>
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
  </Paper>;
};
