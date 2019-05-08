import styled from 'styled-components';
import {AppBar as MUIAppBar, IconButton} from '@material-ui/core';
import React, {useContext} from 'react';
import {withRouter} from 'react-router';
import Exit from '@material-ui/icons/ExitToApp'
import {AuthContext} from './Routes/Routes';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eceff1;
`;

const WhiteIconButton = styled(IconButton)`
  color: white;
`;

export const Tab = styled.div`
  height: 100%;
  padding: 10px;
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

export const UserInfo = styled.div`
  height: 100%;
  padding: 10px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  margin-left: auto;
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
  const {logout, user} = useContext(AuthContext);
  const onClickTab = (path) => () => {
    props.history.push(path);
  };
  return <Container>
    <AppBar>
      {props.menuItems.map((item) => <Tab
        key={item.path}
        selected={props.location.pathname === item.path}
        onClick={onClickTab(item.path)}
      >
        {item.label}
      </Tab>)}

      {user && <UserInfo>{user.admin ? 'Administrador' : user.name}</UserInfo>}
      <WhiteIconButton onClick={logout}>
        <Exit/>
      </WhiteIconButton>
    </AppBar>
    {props.children}
  </Container>;
});