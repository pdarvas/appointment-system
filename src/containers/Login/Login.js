import React, {useContext, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import styled from 'styled-components';
import {Paper} from '../../components/Paper';
import {AuthContext} from '../../App';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const LoginContainer = styled.div`
  background-color: #eceff1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

export const Login = (props) => {
  const [values, setValues] = useState({email: '', password: ''});
  const {user, login} = useContext(AuthContext);

  if (user) {
    if (user.admin) {
      props.history.replace('/admin');
    } else {
      props.history.replace('/user');
    }
  }

  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value});
  };

  const submitForm = () => {
    login(values.email, values.password).then((user) => console.log(user));
  };

  return <LoginContainer>
    <Paper>
      <Form onSubmit={submitForm}>
        <TextField
          label="email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
          fullWidth
        />
        <TextField
          label="senha"
          type={'password'}
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
          fullWidth
        />
        <Button type={'submit'}>Entrar</Button>
      </Form>
    </Paper>
  </LoginContainer>;
};
