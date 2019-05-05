import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import Firebase from '../Firebase';

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const useAvailableHoursSchedule = () => {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getWeekForDay(currentDay).then(setSchedule);
  }, [currentDay]);

  const getNextWeek = () => setCurrentDay(currentDay.add(1, 'week'));

  const getLastWeek = () => setCurrentDay(currentDay.subtract(1, 'week'));

  const refresh = () => getWeekForDay(currentDay).then(setSchedule);

  return {
    schedule,
    setSchedule,
    getNextWeek,
    getLastWeek,
    refresh
  };
};

const getWeekForDay = async (referenceDay) =>{
  const week = [];

  const weeksSelectedHours = await getSelectedHoursForWeek(referenceDay);

  for (let i = 0; i < 7; i++) {
    const day = dayjs(referenceDay).day(i);

    const label = `${dayNames[i]}\n${day.format('DD/MM')}`;

    const selectedHours = getSelectedHoursForDay(day, weeksSelectedHours);

    week.push({label, selectedHours, dayjs: day})
  }
  return week
};

const getSelectedHoursForWeek = async (referenceDay) => {
  const appointments = await Firebase.getAppointmentsForWeek(referenceDay);
  const a = appointments.map(appointment => {
    return dayjs(appointment.time.toDate())
  });
  return a
};

const getSelectedHoursForDay = (day, selectedInWeek) => {
  const a = selectedInWeek.reduce((acc, selected) => {
      if (selected.day() === day.day()) {
        return [...acc, selected.hour()]
      }
      else {
        return acc
      }
  }, []);
  console.log(day.day(), a);
  return a
};