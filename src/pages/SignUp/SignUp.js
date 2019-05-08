import React, {useContext, useEffect, useState} from 'react';
import {Paper} from '../../components/Paper';
import {AuthContext} from '../../components/Routes/Routes';
import {FormTextField} from '../../components/FormTextField/FormTextField';
import {ErrorMessage, Form, FormButton, FormButtonsContainer, FormPageContainer} from '../../components/Form';

export const SignUp = (props) => {
  const [values, setValues] = useState({});
  const [error, setError] = useState(undefined);
  const {user, signup} = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      if (user.admin) {
        props.history.replace('/admin');
      } else {
        props.history.replace('/user');
      }
    }
  }, [user, props.history]);



  const handleChange = (name) => (event) => {
    setError(undefined);
    setValues({...values, [name]: event.target.value});
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!(values.email && values.name && values.phone && values.password && values.confirmPassword)) {
      setError('Preencha todos os campos');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('As senhas devem ser iguais');
      return;
    }

    signup(values).catch(e => {
      if (e.code === 'auth/email-already-in-use') {
        setError('Este email já está em uso, por favor escolha outro.')
      } else if (e.code === 'auth/invalid-email') {
        setError('Este email é inválido.')
      } else {
        setError('Houve um erro desconhecido. Por favor, tente novamente.')
      }
    })
  };

  return <FormPageContainer>
    <Paper>
      <Form onSubmit={submitForm}>
        <FormTextField
          label={'Nome'}
          values={values}
          handleChange={handleChange}
          name={'name'}
        />
        <FormTextField
          label={'Email'}
          values={values}
          handleChange={handleChange}
          name={'email'}
        />
        <FormTextField
          label={'Telefone'}
          values={values}
          handleChange={handleChange}
          name={'phone'}
        />
        <FormTextField
          label={'Senha'}
          values={values}
          handleChange={handleChange}
          name={'password'}
          type={'password'}
        />
        <FormTextField
          label={'Confirmar a senha'}
          values={values}
          handleChange={handleChange}
          name={'confirmPassword'}
          type={'password'}
        />
        <FormButtonsContainer>
          <FormButton type={'submit'} variant="contained">Enviar</FormButton>
        </FormButtonsContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
    </Paper>
  </FormPageContainer>;
};
