import React, {Fragment, useState} from 'react';
import {Schedule} from '../Schedule/Schedule';
import {useAvailableHoursSchedule} from '../../hooks/useAvailableHoursSchedule';
import Button from '@material-ui/core/Button';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import styled from 'styled-components';

const PickerContainer = styled.div`
  display: flex;
`;

export const NewAppointmentPicker = () => {
  const {schedule, setSchedule, getLastWeek, getNextWeek} = useAvailableHoursSchedule();
  return <PickerContainer>
    <Button onClick={getLastWeek}><NavigateBefore/></Button>
    <Schedule setSchedule={setSchedule} schedule={schedule}/>
    <Button onClick={getNextWeek}><NavigateNext/></Button>
  </PickerContainer>
};