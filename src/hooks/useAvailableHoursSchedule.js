import {useEffect, useState} from 'react';
import dayjs from 'dayjs';

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const useAvailableHoursSchedule = () => {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    setSchedule(getWeekForDay(currentDay))
  }, [currentDay]);

  const getNextWeek = () => setCurrentDay(currentDay.add(1, 'week'));

  const getLastWeek = () => setCurrentDay(currentDay.subtract(1, 'week'));

  return {schedule, setSchedule, getNextWeek, getLastWeek};
};

const getWeekForDay = (referenceDay) =>{
  const days = [];

  for (let i = 1; i < 6; i++) {
    const day = dayjs(referenceDay).day(i);

    const label = `${dayNames[i]}\n${day.format('DD/MM')}`;

    days.push({label, selectedHours: []})
  }

  return days
};