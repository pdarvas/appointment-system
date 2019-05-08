import React from 'react';
import {Schedule} from '../../components/Schedule/Schedule';
import styled from 'styled-components';
import Firebase from '../../Firebase';
import {useGenericFreeSlots} from '../../hooks/useGenericFreeSlots';
import {Paper} from '../../components/Paper';
import {LoadingOverlay} from '../../components/LoadingOverlay/LoadingOverlay';
import {ScheduleHelper} from '../../components/ScheduleHelper';

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
    <ScheduleHelper>
      Selecione os horários disponíveis para atendimento abaixo.<br/>
      Clique em um horário em branco para torná-lo disponível, <br/>e em um horário em verde para torná-lo indisponível.<br/>
      Não se preocupe, suas alterações serão salvas automaticamente.
    </ScheduleHelper>
    <PickerContainer>
      <Schedule schedule={schedule} onClickCell={onClickCell}/>
    </PickerContainer>
  </Paper>;
};
