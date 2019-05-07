import React, {useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageContainer} from '../PageContainer';
import {NewAppointmentPicker} from '../NewAppointmentPicker/NewAppointmentPicker';
import {AvailabilityPicker} from '../AvailabilityPicker/AvailabilityPicker';
import {ScheduledAppointmentsViewer} from '../ScheduledAppointmentsViewer/ScheduledAppointmentsViewer';
import {AuthContext} from '../../App';

const userPages = [
  {
    label: 'Consultas Agendadas',
    path: '/user/schedule'
  },
  {
    label: 'Agendar Consulta',
    path: '/user/new-appointment'
  }];

export const UserRoute = ({match, history}) => {
  const {user} = useContext(AuthContext);

  if (!user) {
    history.replace('/login');
    return null;
  }

  if (user.admin) {
    history.replace('/admin');
    return null;
  }

  return <PageContainer
    menuItems={userPages}
  >
    <Switch>
      <Route path={`${match.path}/schedule`} component={ScheduledAppointmentsViewer}/>
      <Route path={`${match.path}/new-appointment`} component={NewAppointmentPicker}/>
      <Redirect from={match.path} to={`${match.path}/schedule`}/>
    </Switch>
  </PageContainer>;
};