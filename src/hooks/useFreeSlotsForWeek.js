import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import Firebase from '../Firebase';
import {useGenericFreeSlots} from './useGenericFreeSlots';

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const useFreeSlotsForWeek = () => {
  const {loading: genericLoading, schedule: genericSlots} = useGenericFreeSlots();
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!genericLoading) {
      return Firebase.getAppointmentsForWeek(currentDay, (appointments) => {
        const appointmentDates = appointments.map(appointment => {
          return dayjs(appointment.date.toDate())
        });

        removeAppointmentsFromGenericSlots(currentDay, genericSlots, appointmentDates)
          .then(setSchedule)
          .then(() => setLoading(false))
      });
    }
  }, [currentDay, genericLoading, genericSlots]);

  const getNextWeek = () => setCurrentDay(currentDay.add(1, 'week'));

  const getLastWeek = () => setCurrentDay(currentDay.subtract(1, 'week'));

  return {
    schedule,
    setSchedule,
    getNextWeek,
    getLastWeek,
    loading: loading || genericLoading
  };
};

const removeAppointmentsFromGenericSlots = async (referenceDay, slots, appointments) =>{
  const schedule = [];

  for (let i = 0; i < 7; i++) {
    const day = dayjs(referenceDay).day(i);

    const label = `${dayNames[i]}\n${day.format('DD/MM')}`;

    const appointmentsOfDay = appointments.filter(date => date.day() === i);

    const freeSlotsOfDay = slots[i].selectedHours;

    const selectedHours = removeAppointmentsFromFreeSlots(freeSlotsOfDay, appointmentsOfDay);

    schedule.push({label, selectedHours, dayjs: day})
  }
  return schedule
};

const removeAppointmentsFromFreeSlots = (availableInDay, appointmentsForDay) => {
  return availableInDay.filter(hour => !appointmentsForDay.find(app => app.hour() === hour));
};