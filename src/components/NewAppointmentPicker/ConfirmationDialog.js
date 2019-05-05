import Button from '@material-ui/core/Button';
import React from 'react';
import {Dialog} from '../Dialog/Dialog';

export const ConfirmationDialog = (props) => (
  <Dialog
    open={props.confirmationOpen}
    onClose={props.closeConfirmation}
    title={'Criar Agendamento'}
    text={`Tem certeza que deseja criar um agendamento no dia ${props.selectedTime.format('DD/MM')},
        às ${props.selectedTime.format('HH:mm')}?`}
    actions={[
      <Button onClick={props.closeConfirmation}>Cancelar</Button>,
      <Button onClick={props.onConfirm}>Confirmar</Button>
    ]}
  />);