import {Dialog as MUIDialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DialogText = styled(DialogContentText)`
  white-space: pre-line;
`;

export const Dialog = (props) => <MUIDialog open={props.open} onClose={props.onClose}>
  <DialogTitle>{props.title}</DialogTitle>
  <DialogContent>
    <DialogText>
      {props.text}
    </DialogText>
  </DialogContent>
  <DialogActions>
    {props.actions}
  </DialogActions>
</MUIDialog>;

Dialog.propTypes = {
  open: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
  actions: PropTypes.any,
};

