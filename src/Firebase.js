// Firebase App is always required and must be first
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

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
    this.database = firebase.firestore();
    this.auth = firebase.auth();
  }

  getAppointmentsForWeek(day, callback) {
    const appointmentsRef = this.database.collection('appointments');

    const pureDay = getPureDay(day.day(0));

    const query = appointmentsRef
      .where('date', '>', pureDay.toDate())
      .where('date', '<', pureDay.add(7, 'day').toDate());

    return query.onSnapshot((snapshot => callback(snapshot.docs.map(doc => doc.data()))))
  }

  getAppointmentsForWeekAndUser(day, userId, callback) {
    const appointmentsRef = this.database.collection('appointments');

    const pureDay = getPureDay(day.day(0));

    console.log('id', userId);

    const query = appointmentsRef
      .where('date', '>', pureDay.toDate())
      .where('date', '<', pureDay.add(7, 'day').toDate())
      .where('user', '==', userId);

    return query.onSnapshot((snapshot => callback(snapshot.docs.map(doc => doc.data()))))
  }

  getGenericSlots(callback) {
    const slotsRef = this.database.collection('slots');

    return slotsRef.onSnapshot(snapshot => callback(snapshot.docs.reduce((acc, doc) => ({...acc, [doc.id]: doc.data()}), {})));
  }

  getSlotsForWeek(userId, day, callback) {
    const appointmentsRef = this.database.collection('appointments');

    const pureDay = getPureDay(day.day(0));

    const query = appointmentsRef
      .where('date', '>', pureDay.toDate())
      .where('date', '<', pureDay.add(7, 'day').toDate());

    return query.onSnapshot((snapshot => callback(snapshot.docs.map(doc => doc.data()))))
  }

  async createAppointment(time, userId) {
    const appointmentsRef = this.database.collection('appointments');

    await appointmentsRef.add({
      date: getPureHour(time).toDate(),
      user: userId,
    });
  }

  async toggleSlotByTime(time) {
    const slotsRef = this.database.collection('slots');

    const dayDoc = slotsRef.doc(`${time.day()}`);

    const day = await dayDoc.get();

    const hour = time.hour();

    if (day.exists && day.data().availableHours.includes(hour)) {
      return dayDoc.update({
        availableHours: firebase.firestore.FieldValue.arrayRemove(hour)
      })
    }

    if (day.exists) {
      return dayDoc.update({
        availableHours: firebase.firestore.FieldValue.arrayUnion(hour)
      })
    }

    return dayDoc.set({availableHours: [hour]})
  }

  async getAppointmentDetailByTime(time) {
    const appointmentsRef = this.database.collection('appointments');
    const query = appointmentsRef
      .where('date', '==', getPureHour(time).toDate());

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

  async getUser(id) {
    const usersRef = this.database.collection('users');

    const user = await usersRef.doc(id).get();

    return {
      id,
      ...user.data()
    }
  }

  async createUser(id, user) {
    const usersRef = this.database.collection('users');

    return usersRef.doc(id).set(user);
  }
}

const getPureDay = (time) => {
  return time.hour(0).minute(0).second(0).millisecond(0)
};

const getPureHour = (time) => {
  return time.minute(0).second(0).millisecond(0)
};

export default new Firebase();

