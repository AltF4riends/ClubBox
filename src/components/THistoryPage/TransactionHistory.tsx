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
} from "@firebase/firestore";
import { auth, db } from "../../firebase";

const [paymemntInfo, setPaymemntInfo] = useState({
  clubName: "",
  clubStatus: "",
  clubLinkedIn: "",
  clubTelegram: "",
  clubFacebook: "",
  clubAppReq: "",
  clubDesc: "",
  clubType: "",
  clubLogo: "",
  Applist: [] as string[],
});



useEffect(() => {
  const handleOnLoad = async () => {
    console.log(userID);

    console.log("Student Access 2");
    const docClubRef = doc(db, "Payment", `${id}`); //change it to clubID later
    const docPaymentSnap = await getDocs(collection(db, "Payment"));
    console.log("Student Access 3");

    if (docClubSnap.exists()) {
      const clubData = docClubSnap.data();
      console.log("Access Club Info");
      setClubInfo({
        clubName: clubData.clubName,
        clubStatus: clubData.clubStatus,
        clubLinkedIn: clubData.clubLinkedIn,
        clubTelegram: clubData.clubTelegram,
        clubFacebook: clubData.clubFacebook,
        clubAppReq: clubData.clubAppReq,
        clubDesc: clubData.clubDesc,
        clubType: clubData.clubType,
        clubLogo: clubData.clubLogo,
        Applist: clubData.Applist,
      });
    } else {
      console.log("No such club documents!");
    }

    //   } else {
    //     console.log("No such document!");
    //   }
    // }
  };

  handleOnLoad();
}, [userID]);

const transactionHistory = () => {
  return <div>

  </div>;
};

export default transactionHistory;
