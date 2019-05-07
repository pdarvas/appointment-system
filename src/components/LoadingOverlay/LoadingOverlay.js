import React from 'react';
import {CircularProgress} from '@material-ui/core';
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.2);
  z-index: 10000;
`;

export const LoadingOverlay = () => {
  return <Container>
    <CircularProgress size={40}/>
  </Container>
};