import React, {useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PageContainer} from '../PageContainer';
import {NewAppointmentPicker} from '../../pages/NewAppointmentPicker/NewAppointmentPicker';
import {ScheduledAppointmentsViewer} from '../../pages/ScheduledAppointmentsViewer/ScheduledAppointmentsViewer';
import {AuthContext} from '../Routes/Routes';

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

  useEffect(() => {
    if (!user) {
      history.replace('/login');
    } else if (user.admin) {
      history.replace('/admin');
    }
  }, [user, history]);


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