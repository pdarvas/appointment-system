import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React from 'react';

export const ConfirmationDialog = (props) => <Dialog open={props.confirmationOpen} onClose={props.closeConfirmation}>
  <DialogTitle>Criar agendamento</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Tem certeza que deseja criar um agendamento no dia {props.selectedTime.format('DD/MM')}, às {props.selectedTime.format('HH:mm')}?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={props.closeConfirmation}>Cancelar</Button>
    <Button onClick={props.onConfirm}>Confirmar</Button>
  </DialogActions>
</Dialog>;