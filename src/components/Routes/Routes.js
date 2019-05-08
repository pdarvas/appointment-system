import {LoadingOverlay} from '../LoadingOverlay/LoadingOverlay';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../../pages/Login/Login';
import {AdminRoute} from '../PrivateRoutes/AdminRoute';
import {UserRoute} from '../PrivateRoutes/UserRoute';
import React from 'react';
import {useFirebaseAuth} from '../../hooks/useFirebaseAuth';
import {SignUp} from '../../pages/SignUp/SignUp';

export const AuthContext = React.createContext({});

export const Routes = () => {
  const {loading, login, user, logout, signup} = useFirebaseAuth();

  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    signup
  }}>
    {loading && <LoadingOverlay/>}
    <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={Login}/>
        <Route path={'/signup'} component={SignUp}/>
        <Route path={'/admin'} component={AdminRoute}/>
        <Route path={'/user'} component={UserRoute}/>
        <Redirect to={'/login'}/>
      </Switch>
    </BrowserRouter>
  </AuthContext.Provider>
};

