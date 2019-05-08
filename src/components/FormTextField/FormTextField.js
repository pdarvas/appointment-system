import TextField from '@material-ui/core/TextField';
import React from 'react';

export const FormTextField = ({label, name, values, handleChange, type}) => {
  return <TextField
    label={label}
    type={type}
    value={values[name] || ''}
    onChange={handleChange(name)}
    margin="normal"
    fullWidth
  />
};