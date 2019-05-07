import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import Firebase from '../Firebase';

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const useAppointmensSchedule = () => {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return Firebase.getAppointmentsForWeek(currentDay, (appointments) => {
      const dayjsAppointments = appointments.map(appointment => {
        return dayjs(appointment.time.toDate())
      });

      getWeekForDay(currentDay, dayjsAppointments).then((newSchedule) => {
        setSchedule(newSchedule);
        setLoading(false);
      })
    });
  }, [currentDay]);

  const getNextWeek = () => setCurrentDay(currentDay.add(1, 'week'));

  const getLastWeek = () => setCurrentDay(currentDay.subtract(1, 'week'));

  return {
    schedule,
    setSchedule,
    getNextWeek,
    getLastWeek,
    loading
  };
};

const getWeekForDay = async (referenceDay, weeksSelectedHours) =>{
  const week = [];

  for (let i = 0; i < 7; i++) {
    const day = dayjs(referenceDay).day(i);

    const label = `${dayNames[i]}\n${day.format('DD/MM')}`;

    const selectedHours = getSelectedHoursForDay(day, weeksSelectedHours);

    week.push({label, selectedHours, dayjs: day})
  }
  return week
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
  return a
};