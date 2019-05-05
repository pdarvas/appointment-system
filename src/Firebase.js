// Firebase App is always required and must be first
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "appointments-system-c5071.firebaseapp.com",
  databaseURL: "https://appointments-system-c5071.firebaseio.com",
  projectId: "appointments-system-c5071",
  storageBucket: "appointments-system-c5071.appspot.com",
  messagingSenderId: "76431504573",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.firestore()
  }

  getAppointmentsForWeek(day, callback) {
    const appointmentsRef = this.database.collection('availableHours');

    const pureDay = getPureDay(day.day(0));

    const query = appointmentsRef
      .where('time', '>', pureDay.toDate())
      .where('time', '<', pureDay.add(7, 'day').toDate())
      .where('scheduled', '==', true);

    return query.onSnapshot((snapshot => callback(snapshot.docs.map(doc => doc.data()))))
  }

  getSlotsForWeek(day, callback) {
    const appointmentsRef = this.database.collection('availableHours');

    const pureDay = getPureDay(day.day(0));

    const query = appointmentsRef
      .where('time', '>', pureDay.toDate())
      .where('time', '<', pureDay.add(7, 'day').toDate())
      .where('scheduled', '==', false);

    return query.onSnapshot((snapshot => callback(snapshot.docs.map(doc => doc.data()))))
  }

  async createAppointment(time) {
    const appointmentsRef = this.database.collection('availableHours');
    const query = appointmentsRef
      .where('time', '==', getPureHour(time).toDate())
      .where('scheduled', '==', false);

    const hours = await query.get();

    const hourToReplace = hours.docs[0].id;

    await appointmentsRef.doc(hourToReplace).set({
      time: getPureHour(time).toDate(),
      scheduled: true,
    });
  }

  async toggleSlotByTime(time) {
    const appointmentsRef = this.database.collection('availableHours');
    const query = appointmentsRef
      .where('time', '==', getPureHour(time).toDate());

    const slots = await query.get();

    if (slots.empty) {
      return appointmentsRef.add({
        time: getPureHour(time).toDate(),
        scheduled: false,
      });
    }

    return slots.docs[0].ref.delete();
  }

  async getAppointmentDetailByTime(time) {
    const appointmentsRef = this.database.collection('availableHours');
    const query = appointmentsRef
      .where('time', '==', getPureHour(time).toDate())
      .where('scheduled', '==', true);

    const appointments = await query.get();

    if (!appointments.empty) {
     return {...appointments.docs[0].data(), id: appointments.docs[0].id}
    }
    return undefined
  }

  async deleteAppointment(id) {
    const appointmentsRef = this.database.collection('availableHours');

    return appointmentsRef.doc(id).update({scheduled: false});
  }
}

const getPureDay = (time) => {
  return time.hour(0).minute(0).second(0).millisecond(0)
};

const getPureHour = (time) => {
  return time.minute(0).second(0).millisecond(0)
};

export default new Firebase();

