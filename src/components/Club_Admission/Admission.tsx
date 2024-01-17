import React, { useEffect, useRef, useState } from "react";
import { trace } from "firebase/performance";
import Footer from "../HomePage/Footer";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useImageContext } from "../ImageContext";
import "./Admission.css";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

const Admission: React.FC = () => {
  interface ProfileInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    forgetPasswordQuestion: string;
  }

  const [eventData, setEventData] = useState({
    Applist: [],
  });
  const [userID, setUserID] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<ProfileInfo[]>([]);
  const [checked, setChecked] = React.useState<number[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<ProfileInfo[]>([]);

  interface ProfileInfo {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    forgetPasswordQuestion: string;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Before: ", user);
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID(null);
      }
    });

    // Load data when the component mounts
    const loadData = async () => {
      if (userID) {
        await handleLoad(); // Call handleLoad when the component mounts
      }
    };

    loadData();

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleAdmission = async () => {
    if (userID && selectedProfiles.length > 0) {
      try {
        const clubQuery = query(
          collection(db, "Club"),
          where("PID", "==", userID)
        );
        const clubQuerySnapshot = await getDocs(clubQuery);

        if (!clubQuerySnapshot.empty) {
          const clubDocRef = clubQuerySnapshot.docs[0].ref;
          const currentMembers =
            clubQuerySnapshot.docs[0].data()?.Members || [];
          const updatedMembers = [...currentMembers, ...selectedProfiles];

          await updateDoc(clubDocRef, { Members: updatedMembers });
          console.log("Members added successfully!");

          const updatedApplist = eventData.Applist.filter(
            (appId: string, index: number) => {
              if (checked.indexOf(index) !== -1) {
                const shouldKeep = !selectedProfiles.some(
                  (profile) => profile.id === appId
                );
                return shouldKeep;
              }
              return true;
            }
          );

          await updateDoc(clubDocRef, { Applist: updatedApplist });
          console.log("Profiles removed from Applist successfully!");

          // Update profiles state by filtering out the admitted profiles
          setProfiles((prevProfiles) =>
            prevProfiles.filter(
              (profile) =>
                !selectedProfiles.some(
                  (selectedProfile) => selectedProfile.id === profile.id
                )
            )
          );

          // Reset checked and selectedProfiles states
          setChecked([]);
          setSelectedProfiles([]);
        } else {
          console.error("No club document found for the given PID");
        }
      } catch (error) {
        console.error("Error updating club document:", error);
      }
    }
  };

  const handleReject = async () => {
    if (userID && selectedProfiles.length > 0) {
      try {
        const clubQuery = query(
          collection(db, "Club"),
          where("PID", "==", userID)
        );
        const clubQuerySnapshot = await getDocs(clubQuery);

        if (!clubQuerySnapshot.empty) {
          const clubDocRef = clubQuerySnapshot.docs[0].ref;

          const updatedApplist = eventData.Applist.filter(
            (appId: string, index: number) => {
              return checked.indexOf(index) === -1;
            }
          );

          await updateDoc(clubDocRef, { Applist: updatedApplist });
          console.log("Profiles removed from Applist successfully!");

          // Update profiles state by filtering out the rejected profiles
          setProfiles((prevProfiles) =>
            prevProfiles.filter(
              (profile) =>
                !selectedProfiles.some(
                  (selectedProfile) => selectedProfile.id === profile.id
                )
            )
          );

          // Reset checked and selectedProfiles states
          setChecked([]);
          setSelectedProfiles([]);
        } else {
          console.error("No club document found for the given PID");
        }
      } catch (error) {
        console.error("Error updating club document:", error);
      }
    }
  };

  const handleLoad = async () => {
    if (userID) {
      const userQuery = query(
        collection(db, "Club"),
        where("PID", "==", userID)
      );

      try {
        const querySnapshot = await getDocs(userQuery);
        if (querySnapshot.docs.length > 0) {
          const eventsData = querySnapshot.docs[0].data();
          setEventData({
            Applist: eventsData.Applist,
          });

          if (eventData.Applist.length >= 0) {
            // Fetch documents for each item in the Applist array
            const promises = eventData.Applist.map(async (appId: string) => {
              const docRef = doc(db, "Student", appId);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                  id: docSnap.id,
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.utmEmail,
                  phoneNumber: data.phoneNumber,
                  address: data.address,
                };
              } else {
                console.log(`No such document for appId: ${appId}`);
                return null;
              }
            });

            // Wait for all promises to resolve
            const resolvedProfiles = await Promise.all(promises);

            // Update profiles with the fetched data
            setProfiles(
              resolvedProfiles.filter(
                (profile): profile is ProfileInfo => profile !== null
              )
            );
          } else {
            console.log("Applist is empty!");
          }
        } else {
          console.log("No document found for the given userID");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }
  };

  const handleToggle = (value: number, profile: ProfileInfo) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      setSelectedProfiles((prev) => [...prev, profile]);
    } else {
      newChecked.splice(currentIndex, 1);
      setSelectedProfiles((prev) =>
        prev.filter((selectedProfile) => selectedProfile.id !== profile.id)
      );
    }

    setChecked(newChecked);
  };

  return (
    <div className="body">
      <div className="admission-container">
        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          className="admission-list"
        >
          {profiles.map((profile, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Checkbox
                  onChange={handleToggle(index, profile)}
                  checked={checked.indexOf(index) !== -1}
                  aria-labelledby={`checkbox-list-secondary-label-${index}`}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={`Avatar n°${index + 1}`} />
                </ListItemAvatar>
                <ListItemText
                  id={`checkbox-list-secondary-label-${index}`}
                  primary={`${profile.firstName} ${profile.lastName}`}
                  // Display other profile fields accordingly
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      <div className="admission-box">
        {selectedProfiles.length > 0 && (
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab variant="extended" color="primary" onClick={handleAdmission}>
              <NavigationIcon sx={{ mr: 1 }} />
              Admit
            </Fab>
            <Fab variant="extended" color="secondary" onClick={handleReject}>
              <NavigationIcon sx={{ mr: 1 }} />
              Reject
            </Fab>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Admission;
