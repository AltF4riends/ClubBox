import { createContext, useContext, useEffect, useState, } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { provider } from '../../firebase';


const UserContext = createContext();

globalThis.userID = "";//

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signInGoogle = () =>{
   return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }


  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(function(data){userID = data.user.uid.toString(); console.log(userID)});
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password).then(function(data){userID = data.user.uid.toString(); console.log(userID)});
   }

  const logout = () => {
      return signOut(auth).then(function(data){userID = ""; console.log(userID)});
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, signInGoogle }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
