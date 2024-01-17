import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import {
  collection,
  addDoc,
  updateDoc,
  setDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useImageContext } from "../ImageContext";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

// Usage

interface FormData {
  clubID: string;
  clubName: string;
  PID: string;
  B_Desc: string;
  clubDesc: string;
  clubAppReq: string[];
  clubFacebook: string;
  clubLinkedIn: string;
  clubStatus: string;
  clubTelegram: string;
  clubLogo: string;
  Members: String[];
  Applist: String[];
}

const EditInfoBody: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    clubID: "",
    clubName: "",
    PID: "",
    B_Desc: "",
    clubDesc: "",
    clubAppReq: [],
    clubFacebook: "",
    clubLinkedIn: "",
    clubStatus: "",
    clubTelegram: "",
    clubLogo: "",
    Members: [],
    Applist: [],
  });

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchClubData = async () => {
      if (!id) {
        console.error("Club ID is undefined");
        return;
      }

      try {
        const clubDoc = await getDoc(doc(db, "Club", id));
        if (clubDoc.exists()) {
          setFormData(clubDoc.data() as FormData);
        } else {
          console.error("Club not found");
          // Handle the case where the club is not found, e.g., redirect to an error page
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
        // Handle the error, e.g., redirect to an error page
      }
    };

    fetchClubData();
  }, [id]);

  const handleToggle = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Update the document in the "Club" collection with the provided ID
      if (id) {
        await updateDoc(
          doc(db, "Club", id || ""),
          formData as { [x: string]: any }
        );

        // Wait for the promise to resolve before calling saveInfo
        await saveInfo(id);

        // Clear form fields
        setFormData({
          clubID: "",
          clubName: "",
          PID: "",
          B_Desc: "",
          clubDesc: "",
          clubAppReq: [],
          clubFacebook: "",
          clubLinkedIn: "",
          clubStatus: "",
          clubTelegram: "",
          clubLogo: "",
          Members: [],
          Applist: [],
        });

        // Switch back to edit mode
        setEditMode(true);

        // Show success message
        alert("Club information updated successfully!");
      } else {
        console.error("Club ID is undefined");
      }

      // Handle the case where id is undefined, e.g., show an error message or redirect
    } catch (error) {
      console.error("Error updating document: ", error);
      // Optionally, you can show an error message here
    }
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "top",
    alignItems: "center",
    height: "99vh",
    marginLeft: "5vh",
    marginRight: "5vh",
  };

  const formContainerStyle: React.CSSProperties = {
    display: "flex", // Set display to flex to make children flex items
    gap: "10px", // Add gap between the two halves
    textAlign: "center", // Set text alignment to center within the form container
    padding: "10px", // Add padding to the form container
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    width: "100%", // Set width to 50% to make each half take half of the screen
    height: "90%",
  };

  const formStyle: React.CSSProperties = {
    width: "100%", // Set width to 100% to make each half take full width within the container
    fontSize: "1vw", // Set the font size for the elements inside the form
    gap: "10px",
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "50%", // Set width to 100% to make it take the full width
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: "10px",
    pointerEvents: editMode ? "auto" : "none",
    opacity: editMode ? 1 : 0.5,
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    console.log("In change function");

    if (image) {
      console.log("Inside if change function");
      setImage(image);
      setImageUrl(URL.createObjectURL(image));
    }
  };

  const handleImageClick = () => {
    console.log("In click function");
    inputRef.current?.click();
  };

  const saveInfo = async (ClubId: string) => {
    try {
      if (image) {
        console.log("inside save image: ", image);
        const storageRef = ref(getStorage(), `Club/${ClubId}/logo`);

        // Upload the image
        await uploadBytes(storageRef, image);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update the Firestore document with the updated image URL
        await updateDoc(doc(db, "Club", ClubId), {
          ...formData,
          clubLogo: downloadURL,
        });
      } else {
        console.log("No picture");
      }
    } catch (error) {
      console.error("Error saving information:", error);
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={containerStyle}>
      <form style={formContainerStyle} onSubmit={handleSubmit}>
        <div style={formStyle}>
          <h1>Editing Club Info</h1>
          <div
            onClick={handleImageClick}
            style={{
              cursor: "pointer",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            {image ? (
              <img
                height="150vh"
                width="160vw"
                src={URL.createObjectURL(image)}
                alt="Profile"
              />
            ) : (
              <img
                height="150vh"
                width="160vw"
                src={formData.clubLogo || "profile.png"}
                alt="Profile"
              />
            )}

            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div style={inputStyle}>
            <h3>Club Name</h3>
            <input
              type="text"
              className="inputField"
              name="clubName"
              value={formData.clubName}
              disabled={!editMode} // Disable input when not in edit mode
            />
          </div>
          <div style={inputStyle}>
            <h3>President ID</h3>
            <input
              type="text"
              className="inputField"
              name="PID"
              value={formData.PID}
            />
          </div>

          <div style={inputStyle}>
            <h3>Brief Description</h3>
            <input
              type="text"
              className="inputField"
              name="B_Desc"
              value={formData.B_Desc}
            />
          </div>
        </div>

        <div style={formStyle}>
          <div style={inputStyle}>
            <h3>Facebook Link</h3>
            <input
              type="text"
              className="inputField"
              name="clubFacebook"
              value={formData.clubFacebook}
            />
          </div>

          <div style={inputStyle}>
            <h3>Application Requirements</h3>
            <textarea
              className="inputField"
              name="clubAppReq"
              value={formData.clubAppReq.join("\n")} // Join array into a string with newlines
              style={{ whiteSpace: "pre-wrap" }} // Set white-space style
            />
          </div>

          <div style={inputStyle}>
            <h3>LinkedIn Link</h3>
            <input
              type="text"
              className="inputField"
              name="clubLinkedIn"
              value={formData.clubLinkedIn}
            />
          </div>

          <div style={inputStyle}>
            <h3>Telegram Link</h3>
            <input
              type="text"
              className="inputField"
              name="clubTelegram"
              value={formData.clubTelegram}
            />
          </div>

          <div style={inputStyle}>
            <h3>Club Description</h3>
            <textarea
              className="inputField"
              name="clubDesc"
              value={formData.clubDesc} // You might want to use a value if you want to control the textarea content
            />
          </div>

          <div style={inputStyle}>
            <h3>Club Type</h3>
            <label></label>

            <select name="clubStatus" id="ClubType" value={formData.clubStatus}>
              <option value=""></option>
              <option value="Active">Active</option>
              <option value="In-Active">In-Active</option>
            </select>
          </div>
          <button
            type="button"
            style={submitButtonStyle}
            onClick={handleToggle}
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfoBody;
