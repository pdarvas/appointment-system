import React, {Fragment, useState} from 'react';
import {Schedule} from '../../components/Schedule/Schedule';
import Button from '@material-ui/core/Button/index';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import styled from 'styled-components';
import Firebase from '../../Firebase';
import {useGenericFreeSlots} from '../../hooks/useGenericFreeSlots';
import {Paper} from '../../components/Paper';
import {LoadingOverlay} from '../../components/LoadingOverlay/LoadingOverlay';

const PickerContainer = styled.div`
  display: flex;
`;

export const AvailabilityPicker = () => {
  const {schedule, loading} = useGenericFreeSlots();

  const onClickCell = (day) => (hour) => {
    console.log('asasd')
    Firebase.toggleSlotByTime(day.hour(hour));
  };

  return loading ? <LoadingOverlay/> :  <Paper>
    <PickerContainer>
      <Schedule schedule={schedule} onClickCell={onClickCell}/>
    </PickerContainer>
  </Paper>;
};
