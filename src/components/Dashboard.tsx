// Dashboard.js

import { useEffect, useRef } from "react";
import { useState } from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import Slider from "./HomePage/Slider";
import Search from "./HomePage/Search";
import { Button, message, Space } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "@firebase/firestore";

function Dashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const successMessageShownRef = useRef(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [useName, setuserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        console.log(user.uid);
      } else {
        setUserID(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
    const handleOnLoad = async () => {
      console.log(userID);
      if (userID) {
        const docRef = doc(db, "Student", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data.firstName);
          const firstName = data.firstName;
          const lastName = data.lastName;
          setuserName(firstName);

          if (!successMessageShownRef.current) {
            console.log(useName);
            messageApi.open({
              type: "success",
              content: "Welcome " + firstName + " " + lastName,
            });
            successMessageShownRef.current = true;
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    handleOnLoad();
  }, [userID, messageApi]); // Dependency array to rerun the effect when userID changes

  // Empty dependency array ensures the effect runs only once

  return (
    <div>
      {contextHolder}
      <NavBar />
      <Search />
      <Footer />
      <Slider />
    </div>
  );
}

export default Dashboard;
