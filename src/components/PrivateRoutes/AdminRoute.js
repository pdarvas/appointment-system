import React, {useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageContainer} from '../PageContainer';
import {AvailabilityPicker} from '../../pages/AvailabilityPicker/AvailabilityPicker';
import {ScheduledAppointmentsViewer} from '../../pages/ScheduledAppointmentsViewer/ScheduledAppointmentsViewer';
import {AuthContext} from '../Routes/Routes';

const adminPages = [
  {
    label: 'Consultas Agendadas',
    path: '/admin/schedule'
  },
  {
    label: 'Disponibilidade',
    path: '/admin/availability'
  }];

export const AdminRoute = ({match, history}) => {
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      history.replace('/login');
    } else if (!user.admin) {
      history.replace('/user');
    }
  }, [user, history]);

  return <PageContainer
    menuItems={adminPages}
  >
    <Switch>
      <Route path={`${match.path}/schedule`} component={ScheduledAppointmentsViewer}/>
      <Route path={`${match.path}/availability`} component={AvailabilityPicker}/>
      <Redirect from={match.path} to={`${match.path}/schedule`}/>
    </Switch>
  </PageContainer>;
};