import React, { useEffect, useState } from "react";
import { Checkbox, Divider, Button, Popover, Spin } from "antd";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  writeBatch,
  updateDoc,
  onSnapshot,
  snapshotEqual
} from "@firebase/firestore";
import { auth, db } from "../../firebase";

interface PaymentInfo {
  paymentStatus: string;
}

interface EventInfo {
  id: string;
  title: string;
  description: string;
  image: string;
  clubId: string;
  logo: string;
  price: string;
  date: string;
  location: string;
}

const transactionHistory = () => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    const handleOnLoad = async () => {
    try{
      console.log(userID);
      console.log("Student Payment 1");

      const paymentRef = collection(db, "Payment");
      const q = query(
        paymentRef,
        where("paymentStatus", "==", "unpaid"),
        where("studentID", "==", userID)
      );
      
      console.log("Student Access 2");
      const querySnapshot = await getDocs(q);
      

      if(querySnapshot.size == 0)
      {
        console.log("No Documents Found")
      }

      querySnapshot.forEach((doc) => {
        const payRef = collection(db, "Payment", doc.id);
      });
    } catch (error) {
    console.error("Error fetching event data:", error);
    setError("Error fetching event data");
  } finally {
    setLoading(false);
  };
  }
    handleOnLoad();
  }, [userID]);


  return(
    <div 
    style={{
      display: "flex",
      height: "89vh",
      width: "100vw",
      justifyContent: "center",
      alignItems: "center",
    }}>

      <div style={{
        display: "flex",
        height: "85vh",
        width: "90vw",
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: "45px",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div>
          
        </div>
      </div>

    </div>
  )

};

export default transactionHistory;
