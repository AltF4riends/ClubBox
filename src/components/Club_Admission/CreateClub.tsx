import React, { useRef, useState, ChangeEvent } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  setDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useImageContext } from "../ImageContext";
import "./CreateClub.css";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

const getNextDocumentId = async (): Promise<string> => {
  const q = collection(db, "Club");
  const querySnapshot = await getDocs(q);

  let maxNumericPart = 0;

  querySnapshot.forEach((doc) => {
    // Assuming your document IDs follow the pattern "cl001", "cl002", etc.
    const match = doc.id.match(/^cl(\d+)$/);
    if (match) {
      const numericPart = parseInt(match[1], 10);
      maxNumericPart = Math.max(maxNumericPart, numericPart);
    }
  });

  const nextNumericPart = maxNumericPart + 1;
  const nextDocumentId = `cl${nextNumericPart.toString().padStart(3, "0")}`;

  return nextDocumentId;
};

// Usage
const nextDocumentId = await getNextDocumentId();
console.log("Next Document ID:", nextDocumentId);

interface FormData {
  clubID: string;
  clubName: string;
  pNumber: string;
  clubP: string;
  B_Desc: string;
  clubDesc: string;
  clubAppReq: string[];
  clubFacebook: string;
  clubLinkedIn: string;
  clubStatus: string;
  clubTelegram: string;
  clubLogo: string;
}

const CreateClub: React.FC = () => {
  const [Clubtempid, setClubTempId] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    clubID: "",
    clubName: "",
    pNumber: "",
    clubP: "",
    B_Desc: "",
    clubDesc: "",
    clubAppReq: [],
    clubFacebook: "",
    clubLinkedIn: "",
    clubStatus: "",
    clubTelegram: "",
    clubLogo: "",
  });

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | { name: string; value: unknown }
    >
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    if (name === "clubDesc" && type === "textarea") {
      const inputValue = value as string;
      const words = inputValue.split(" ");
      const limitedWords = words.slice(0, 40).join(" ");

      setFormData((prevData) => ({
        ...prevData,
        [name]: limitedWords,
      }));
    } else if (name === "B_Desc") {
      const inputValue = value as string;
      const words = inputValue.split(" ");
      const limitedWords = words.slice(0, 4).join(" ");

      setFormData((prevData) => ({
        ...prevData,
        [name]: limitedWords,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : type === "select-one"
            ? (value as string)
            : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Add the document to the "Club" collection without specifying a document ID
      const docRef = await setDoc(
        doc(collection(db, "Club"), nextDocumentId),
        formData
      );

      // Wait for the promise to resolve before calling saveInfo
      await saveInfo(nextDocumentId);

      setClubTempId(nextDocumentId); // Set Clubtempid after saveInfo

      // Clear form fields
      setFormData({
        clubID: "",
        clubName: "",
        pNumber: "",
        clubP: "",
        B_Desc: "",
        clubDesc: "",
        clubAppReq: [],
        clubFacebook: "",
        clubLinkedIn: "",
        clubStatus: "",
        clubTelegram: "",
        clubLogo: "",
      });

      // Show success message
      alert("Club added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
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
          <h1>New Club Info</h1>
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
                src={formData.clubLogo || "public/profile.png"}
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
              onChange={handleChange}
            />
          </div>
          <div style={inputStyle}>
            <h3>President name</h3>
            <input
              type="text"
              className="inputField"
              name="clubP"
              value={formData.clubP}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Phone Number</h3>
            <input
              type="text"
              className="inputField"
              name="pNumber"
              value={formData.pNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={formStyle}>
          <div style={inputStyle}>
            <h3>Brief Description</h3>
            <input
              type="text"
              className="inputField"
              name="B_Desc"
              value={formData.B_Desc}
              onChange={handleChange}
            />
          </div>
          <div style={inputStyle}>
            <h3>Facebook Link</h3>
            <input
              type="text"
              className="inputField"
              name="clubFacebook"
              value={formData.clubFacebook}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>LinkedIn Link</h3>
            <input
              type="text"
              className="inputField"
              name="clubLinkedIn"
              value={formData.clubLinkedIn}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Telegram Link</h3>
            <input
              type="text"
              className="inputField"
              name="clubTelegram"
              value={formData.clubTelegram}
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Club Description</h3>
            <textarea
              className="inputField"
              name="clubDesc"
              value={formData.clubDesc} // You might want to use a value if you want to control the textarea content
              onChange={handleChange}
            />
          </div>

          <div style={inputStyle}>
            <h3>Club Type</h3>
            <label></label>

            <select
              name="clubStatus"
              id="ClubType"
              value={formData.clubStatus}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Active">Active</option>
              <option value="In-Active">In-Active</option>
            </select>
          </div>
          <button type="submit" style={submitButtonStyle}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClub;
