import React, { useRef, useEffect, useState } from "react";
import aeisecLogo from "./ECImages/AIESEC-Human-Blue 1.png";
import eButton from "./ECImages/editButton.png";
import SettingsIcon from "@mui/icons-material/Settings";
import joinButton from "./ECImages/JoinUs.png";
import rocketIcon from "./ECImages/rocketIcon.png";
import { Link, useParams } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import ClubAnnouncement from "../Club_Admission/ClubAnnouncement";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "./ManageClubBody.css";

const ManageClubBody = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [memberDetails, setMemberDetails] = useState<string[]>([]);
  const [userID, setUserID] = useState<string | null>(null);
  const [isClubOwner, setIsClubOwner] = useState(false);

  // State for profile information
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    forgetPasswordQuestion: "",
    imageUrl: "", // Add imageUrl property to the state
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Before: ", userID);
      if (user) {
        setUserID(user.uid);
        console.log("Insider: ", userID);
      } else {
        setUserID(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once on mount

  const { id } = useParams();

  useEffect(() => {
    const handleOnLoad = async () => {
      if (userID) {
        const docRef = doc(db, "Student", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileInfo({
            ...profileInfo,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.utmEmail,
            phoneNumber: data.phoneNumber,
            address: data.address,
          });

          if (userID && id) {
            const docClubRef = doc(db, "Club", `${id}`);
            const docClubSnap = await getDoc(docClubRef);

            if (docClubSnap.exists()) {
              const clubData = docClubSnap.data();
              setIsClubOwner(clubData.PID === userID);
            } else {
              console.log("PID is not simmilar");
            }
          }
        } else {
          console.log("No such document!");
        }
      }
    };

    handleOnLoad();
  }, [userID, id]); // Dependency array to rerun the effect when userID changes

  // State for profile information
  const [clubInfo, setClubInfo] = useState({
    clubName: "",
    clubStatus: "",
    clubLinkedIn: "",
    clubTelegram: "",
    clubFacebook: "",
    clubAppReq: "",
    clubDesc: "",
    clubType: "",
    clubLogo: "",
    PID: "",
    Applist: [] as string[],
    Members: [] as { id: string }[],
  });

  useEffect(() => {
    const fetchMemberDetails = async () => {
      const details = await Promise.all(
        clubInfo.Members.map(async (memberID) => {
          const detail = await getMemberDetails(memberID.id);
          return `${detail}`;
        })
      );
      setMemberDetails(details);
    };

    fetchMemberDetails();
  }, [clubInfo.Members]);

  useEffect(() => {
    const handleOnLoad = async () => {
      console.log("Student Access 1");
      console.log(userID);
      // Figure out how to preserve the damn User ID
      // if (userID) {
      //   const docRef = doc(db, "Student", userID);
      //   const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   const data = docSnap.data();
      console.log("Student Access 2");
      const docClubRef = doc(db, "Club", `${id}`); //change it to clubID later
      const docClubSnap = await getDoc(docClubRef);
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
          Members: clubData.Members,
          PID: clubData.PID,
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
  const storage = getStorage();
  const [files, setFiles] = useState<FileList | null>(null); // Change from file to files
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getMemberDetails = async (memberID: string) => {
    console.log("ID: ", memberID);
    console.log("ID: ", memberID);
    const docRef = doc(db, "Student", memberID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Inside docSnap: ");
      const data = docSnap.data();
      // Assuming you want to display the student's name, modify this accordingly
      return `${data.firstName} ${data.lastName}`;
    } else {
      return "Member not found";
    }
  };

  const handleImageClick = () => {
    inputRef.current?.click();
    console.log(`Club/${id}/Req`);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles: FileList | null = event.target.files;

    if (selectedFiles) {
      setFiles(selectedFiles);
      const storageRef = ref(
        storage,
        `Club/${id}/Req/${profileInfo.firstName}`
      );

      // Iterate through the selected files and upload each one
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log("We are here");
        const selectedFile = selectedFiles[i];
        await uploadBytes(ref(storageRef, selectedFile.name), selectedFile);
      }

      if (userID) {
        const docClubRef = doc(db, "Club", `${id}`);
        const docClubSnap = await getDoc(docClubRef);

        if (docClubSnap.exists()) {
          const clubData = docClubSnap.data();

          // Ensure the Applist array is an array of strings
          const currentMembers = clubData.Applist.map(String);

          // Update Applist array with user ID
          if (!currentMembers.includes(userID)) {
            const updatedMembers = [...currentMembers, userID];
            // Assuming you want to update the Applist array in the database as well
            await updateDoc(docClubRef, { Applist: updatedMembers });

            setClubInfo((prevClubInfo) => ({
              ...prevClubInfo,
              Applist: updatedMembers,
            }));
          } else {
            // User is already a member
            console.log("User is already a member of this club");
          }
        } else {
          console.log("No such club documents!");
        }
      }
    }
  };

  const navigate = useNavigate();
  const handleEventSelect = () => {
    if (isClubOwner) {
      // Add the logic for handling the edit event here
      navigate(`/edit_club_info/${id}`);
    } else {
      // Optional: Show a message or handle the case when the user is not the owner
      console.log("You are not the owner of this club");
    }
  };

  //End Database Info
  let headingIntro = "WHO WE ARE";
  let headingDesc = clubInfo.clubName;
  let introBody = clubInfo.clubDesc;

  let smallTitle = "Club Requirememnt";
  let smallDesc = clubInfo.clubAppReq || [];
  return (
    <div
      style={{
        display: "flex",
        height: "88.5vh",
        width: " 100vw",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        margin: "auto",
        backgroundImage: 'url("./gradientBlack.jpeg")',
      }}
    >
      <div
        style={{
          display: "flex",
          height: "65vh",
          width: " 25vw",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            height: "55vh",
            width: " 25vw",
          }}
        >
          <img
            src={clubInfo.clubLogo}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            alt="Club Logo"
          />
        </div>

        <div
          className="container-fluid d-flex justify-content-between align-items-center"
          style={{
            height: "5vh",
            width: " 35vw",
            padding: "0.2vw",
          }}
        >
          <a
            className="navbar-brand"
            href={clubInfo.clubTelegram}
            style={{ color: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-telegram"
              viewBox="0 0 16 16"
              style={{ margin: "0 0" }} // Add margin here
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
            </svg>{" "}
          </a>

          <a
            className="navbar-brand"
            href={clubInfo.clubLinkedIn}
            style={{ color: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-linkedin"
              viewBox="0 0 16 16"
              style={{ margin: "0 3vh 0 3vw" }} // Add margin here
            >
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
            </svg>
          </a>

          <a
            className="navbar-brand"
            href={clubInfo.clubFacebook}
            style={{ color: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-facebook"
              viewBox="0 0 16 16"
              style={{ margin: "0 0" }} // Add margin here
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
          </a>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: "85vh",
          width: " 50vw",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            height: "15vh",
            width: " 40vw",
          }}
        >
          <h1 style={{ color: "orange" }}>~ {headingIntro}</h1>
          <br />

          <h2
            style={{
              color: "white",
              fontSize: "3vw",
              textAlign: "justify",
            }}
          >
            {headingDesc}
          </h2>
        </div>

        <div
          style={{
            height: "15vh",
            width: " 10vw",
          }}
        >
          <SettingsIcon
            onClick={handleEventSelect}
            style={{
              fontSize: "2.5rem",
              color: "white",
              maxHeight: "100%",
              maxWidth: "100%",
              cursor: "pointer", // Add cursor pointer for better UX
            }}
            aria-label="Settings Button"
          />
        </div>
        <div
          style={{
            height: "25vh",
            width: " 50vw",
          }}
        >
          <h4 style={{ color: "white", fontSize: "2vw" }}>{introBody}</h4>
        </div>

        <div
          style={{
            display: "flex",
            height: "17vh",
            width: " 45vw",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              height: "11vh",
              width: "16vw",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <img
              src={rocketIcon}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
              }}
              alt="Join Button"
            />
          </div>

          <div
            style={{
              height: "7vh",
              width: " 25vw",
            }}
          >
            <p style={{ color: "white", fontSize: "2vw" }}>{smallTitle}</p>
          </div>

          <div
            style={{
              display: "flex",
              width: " 35vw",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            {Array.isArray(smallDesc) ? (
              <ul
                style={{
                  listStyleType: "disc",
                  color: "white",
                  fontSize: "1.1vw",
                  margin: 0,
                  paddingInlineStart: "",
                }}
              >
                {smallDesc.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "white", fontSize: "1vw", margin: 0 }}>
                {smallDesc}
              </p>
            )}
          </div>
        </div>
        <Stack
          sx={{
            width: "100%",
            ".css-cvuu6o-MuiStack-root ": {
              height: "12vh",
              display: "flex",
              WebkitFlexDirection: "row", // Use camelCase for hyphenated properties
              flexDirection: "row",
              width: "100%",
            },

            ".css-1y8qnlj-MuiStack-root ": {
              height: "12vh",
              display: "flex",
              WebkitFlexDirection: "row", // Use camelCase for hyphenated properties
              flexDirection: "row",
              width: "100%",
            },
          }}
          spacing={2}
        >
          <div
            style={{
              display: "flex",
              height: "11vh",
              width: " 16vw",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPopupOpen(true)}
            >
              Student's list
            </Button>
          </div>

          {/* Dialog for the pop-up */}
          <Dialog open={isPopupOpen} onClose={() => setPopupOpen(false)}>
            <DialogTitle>Members List</DialogTitle>
            <DialogContent>
              <ul>
                {memberDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPopupOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
          <div
            style={{
              display: "flex",
              height: "10vh",
              width: " 50vw",
              justifyContent: "flex-end",
              alignItems: "space-between",
              flexDirection: "row",
            }}
          >
            <div
              onClick={handleImageClick}
              style={{
                cursor: "pointer",
                height: "5vh",
                width: " 15vw",
              }}
            >
              {files ? (
                <Alert
                  severity="success"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center the content vertically
                    justifyContent: "center", // Center the content horizontally
                    width: "50%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    height: "20%",
                    fontSize: "130%",
                  }}
                >
                  <AlertTitle>Success</AlertTitle>
                  This is a success alert — <strong>Documents uploaded!</strong>
                </Alert>
              ) : (
                <img
                  src={joinButton}
                  style={{
                    maxHeight: "200%",
                    maxWidth: "200%",
                  }}
                  alt="Join Button"
                />
              )}

              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
                multiple
              />
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default ManageClubBody;
