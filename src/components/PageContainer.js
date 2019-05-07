import styled from 'styled-components';
import {AppBar as MUIAppBar, IconButton} from '@material-ui/core';
import React, {useContext} from 'react';
import {withRouter} from 'react-router';
import Exit from '@material-ui/icons/ExitToApp'
import {AuthContext} from '../App';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eceff1;
`;

export const Tab = styled.div`
  height: 100%;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  
  ${({selected}) => selected && 'background-color: rgba(255,255,255,0.32);'}
  
  &:hover
  {
    background-color: rgba(255,255,255,0.16);
  }
  
  &:active {
    background-color: rgba(255,255,255,0.32);
  }
`;
export const AppBar = styled(MUIAppBar)`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  flex-direction: row;
  background-color: #002060;
`;


export const PageContainer = withRouter((props) => {
  const {logout} = useContext(AuthContext);
  const onClickTab = (path) => () => {
    props.history.push(path);
  };
  return <Container>
    <AppBar>
      {props.menuItems.map((item) => <Tab
        selected={props.location.pathname === item.path}
        onClick={onClickTab(item.path)}
      >
        {item.label}
      </Tab>)}
      <IconButton
        onClick={logout}
        style={{color: 'white', marginLeft: 'auto'}}
      >
        <Exit/>
      </IconButton>
    </AppBar>
    {props.children}
  </Container>;
});