/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState();

  const registerUser = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const loginUser = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  const signInWithGoogle = async () =>
    await signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const { email, displayName, photoURL } = user;

        const userData = { email, username: displayName, photo: photoURL };
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    loading,
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
