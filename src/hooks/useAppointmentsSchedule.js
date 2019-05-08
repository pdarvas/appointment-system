import {useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import Firebase from '../Firebase';
import {AuthContext} from '../components/Routes/Routes';

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const useAppointmensSchedule = () => {
  const [currentDay, setCurrentDay] = useState(dayjs());
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user, loading: userLoading} = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      return () => {}
    }

    const handleGetAppointments = (appointments) => {
      const appointmentDates = appointments.map(appointment => {
        return dayjs(appointment.date.toDate())
      });

      mapAppointmentsToSchedule(currentDay, appointmentDates)
        .then(setSchedule)
        .then(() => setLoading(false))
    };

    if (user.admin) {
      return Firebase.getAppointmentsForWeek(currentDay, handleGetAppointments);
    }

    console.log('ta aqui');
    return Firebase.getAppointmentsForWeekAndUser(currentDay, user.id, handleGetAppointments);

  }, [currentDay, user]);

  const getNextWeek = () => setCurrentDay(currentDay.add(1, 'week'));

  const getLastWeek = () => setCurrentDay(currentDay.subtract(1, 'week'));

  return {
    schedule,
    setSchedule,
    getNextWeek,
    getLastWeek,
    loading: loading || userLoading
  };
};

const mapAppointmentsToSchedule = async (referenceDay, weeksSelectedHours) =>{
  const schedule = [];

  for (let i = 0; i < 7; i++) {
    const day = dayjs(referenceDay).day(i);

    const label = `${dayNames[i]}\n${day.format('DD/MM')}`;

    const selectedHours = getSelectedHoursForDay(day, weeksSelectedHours);

    schedule.push({label, selectedHours, dayjs: day})
  }
  return schedule
};

const getSelectedHoursForDay = (day, selectedInWeek) => {
  return selectedInWeek.reduce((acc, selected) => {
      if (selected.day() === day.day()) {
        return [...acc, selected.hour()]
      }
      else {
        return acc
      }
  }, []);
};