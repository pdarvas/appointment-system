import React, {useContext, useEffect, useState} from 'react';
import {Paper} from '../../components/Paper';
import {AuthContext} from '../../components/Routes/Routes';
import {FormTextField} from '../../components/FormTextField/FormTextField';
import {
  Form,
  FormButton,
  FormButtonsContainer,
  FormPageContainer,
  ErrorMessage
} from '../../components/Form';

export const Login = (props) => {
  const [values, setValues] = useState({});
  const [error, setError] = useState(undefined);
  const {user, login} = useContext(AuthContext);

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

    if (!(values.email && values.password)) {
      setError('Preencha todos os campos.');
      return
    }

    login(values.email, values.password)
      .catch(e => {
        console.log('ERRO', e);
        if (e.code === 'auth/email-already-in-use') {
          setError('Este email já está em uso, por favor escolha outro.')
        } else if (e.code === 'auth/invalid-email') {
          setError('Este email é inválido.')
        } else {
          setError('Houve um erro desconhecido. Por favor, tente novamente.')
        }
      })
  };

  const goToSignUp = () => {
    props.history.push('/signup');
  };

  return <FormPageContainer>
    <Paper>
      <Form onSubmit={submitForm}>
        <FormTextField
          label={'Email'}
          values={values}
          handleChange={handleChange}
          name={'email'}
        />
        <FormTextField
          label={'Senha'}
          type={'password'}
          values={values}
          handleChange={handleChange}
          name={'password'}
        />
        <FormButtonsContainer>
          <FormButton type={'submit'}>Entrar</FormButton>
          <FormButton onClick={goToSignUp}>Cadastrar</FormButton>
        </FormButtonsContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
    </Paper>
  </FormPageContainer>;
};
