import Firebase from '../Firebase'
import {useEffect, useState} from 'react'

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return Firebase.auth.onAuthStateChanged(auth => {
      if (auth) {
        Firebase.getUser(auth.uid).then((user) => {
          setUser(user);
          setLoading(false);
        }).catch(() => setLoading(false));
      } else {
        setUser(undefined);
        setLoading(false);
      }
    })
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return Firebase.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setLoading(false);
        throw error;
      })
  };

  const signup = (user) => {
    setLoading(true);
    return Firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(auth => Firebase.createUser(auth.user.uid, {
        name:user.name,
        email: user.email,
        phone: user.phone
      })).catch((error) => {
        setLoading(false);
        throw error;
      })
  };

  const logout = () => {
    setLoading(true);
    Firebase.auth.signOut()
      .catch((error) => {
        setLoading(false);
        throw error;
    })
  };

  return {loading, user, login, signup, logout}
};