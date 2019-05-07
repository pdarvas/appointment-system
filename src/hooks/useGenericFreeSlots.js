import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import Firebase from '../Firebase';

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const useGenericFreeSlots = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return Firebase.getGenericSlots(slots => {
      setLoading(false);
      mapSlotsToSchedule(slots).then(setSchedule);
    })
  }, []);

  return {
    schedule,
    loading
  };
};

const mapSlotsToSchedule = async (slots) =>{
  const schedule = [];
  for (let i = 0; i < 7; i++) {

    const label = dayNames[i];

    const selectedHours = slots[i] ? slots[i].availableHours : [];

    schedule.push({label, selectedHours, dayjs: dayjs().day(i)})
  }
  return schedule
};