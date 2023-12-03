import React from "react";
import { ReactNode, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

interface Props {
  children: ReactNode;
}

const AuthContext = React.createContext({
  currentUser: undefined,
  signup: (email: string, password: string) => {
    Promise<UserCredential>;
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  function signup(email: any, password: any) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
