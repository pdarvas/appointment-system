import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
`;

export const FormPageContainer = styled.div`
  background-color: #eceff1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const FormButton = styled(Button)`
  background-color: #002060;
  width: 250px;
  height: 40px;
  color: white;
  margin: 5px 0;
  
  &:hover {
    background-color: rgba(0,32,96,0.8);
  }
`;

export const FormButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;