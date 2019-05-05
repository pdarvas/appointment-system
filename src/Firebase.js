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

  async getAppointmentsForWeek(day) {
    const appointmentsRef = this.database.collection('appointments');

    const pureDay = getPureDay(day.day(0));

    const query = appointmentsRef
      .where('time', '>', pureDay.toDate())
      .where('time', '<', pureDay.add(7, 'day').toDate());

    const appointments = await query.get();

    return appointments.docs.map(doc => doc.data())
  }

  async createAppointment(appointment) {
    const appointmentsRef = this.database.collection('appointments');

    await appointmentsRef.add(appointment);
  }
}

const getPureDay = (day) => {
  return day.hour(0).minute(0).second(0).millisecond(0)
};

export default new Firebase();

