import React, {Fragment, useState} from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import {NewAppointmentPicker} from './components/NewAppointmentPicker/NewAppointmentPicker';
import {BrowserRouter, Route} from 'react-router-dom';
import {useFirebaseAuth} from './hooks/useFirebaseAuth';
import {Login} from './containers/Login/Login';
import {LoadingOverlay} from './components/LoadingOverlay/LoadingOverlay';
import {AdminRoute} from './components/PrivateRoutes/AdminRoute';
import {AvailabilityPicker} from './components/AvailabilityPicker/AvailabilityPicker';
import {UserRoute} from './components/PrivateRoutes/UserRoute';

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

export const AuthContext = React.createContext({});


function App(props) {
  const {loading, login, user, logout} = useFirebaseAuth();

  console.log(user);

  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <AuthContext.Provider value={{
        user,
        login,
        logout
      }}>
        <div className="App">
          {loading ? <LoadingOverlay/> :
            <BrowserRouter>
              <Route path={'/login'} component={Login}/>
              <Route path={'/admin'} component={AdminRoute}/>
              <Route path={'/user'} component={UserRoute}/>
            </BrowserRouter>
          }
        </div>
      </AuthContext.Provider>
    </JssProvider>
  );
}

export default App;
