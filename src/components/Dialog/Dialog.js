import {Dialog as MUIDialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

export const Dialog = (props) => <MUIDialog open={props.open} onClose={props.onClose}>
  <DialogTitle>{props.title}</DialogTitle>
  <DialogContent>
    <DialogContentText style={{whiteSpace: 'pre-line'}}>
      {props.text}
    </DialogContentText>
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

