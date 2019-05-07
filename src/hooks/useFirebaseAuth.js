import Firebase from '../Firebase'
import {useEffect, useState} from 'react'

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return Firebase.auth.onAuthStateChanged(auth => {
      if(auth) {
        Firebase.getUser(auth.uid).then((user) => {
          setLoading(false);
          setUser(user);
        });
      } else {
        setLoading(false);
        setUser(undefined);
      }
    })
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return Firebase.auth.signInWithEmailAndPassword(email, password)
  };

  const signUp = (user) => {
    setLoading(true);
    Firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
  };

  const logout = () => {
    setLoading(true);
    Firebase.auth.signOut()
  };

  return {loading, user, login, signUp, logout}
};