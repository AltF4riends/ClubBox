import React, { useRef, useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
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

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";

interface FormData {
  clubID: string;
  clubName: string;
  pNumber: string;
  clubP: string;
  bDesc: string;
  clubDesc: string;
  clubAppReq: string[];
  clubFacebook: string;
  clubLinkedIn: string;
  clubStatus: string;
  clubTelegram: string;
  clubLogoURL: string;
}

const CreateClub: React.FC = () => {
  const [Clubtempid, setClubTempId] = useState("");
  const { imageUrl, image, setImageInfo } = useImageContext();
  const [formData, setFormData] = useState<FormData>({
    clubID: "",
    clubName: "",
    pNumber: "",
    clubP: "",
    bDesc: "",
    clubDesc: "",
    clubAppReq: [],
    clubFacebook: "",
    clubLinkedIn: "",
    clubStatus: "",
    clubTelegram: "",
    clubLogoURL: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.clubName ||
      !formData.pNumber ||
      !formData.clubP ||
      !formData.bDesc ||
      !formData.clubDesc ||
      !formData.clubAppReq ||
      !formData.clubFacebook ||
      !formData.clubLinkedIn ||
      !formData.clubStatus ||
      !formData.clubTelegram ||
      !formData.clubLogoURL
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Add the document to the "Club" collection without specifying a document ID
      const docRef = await addDoc(collection(db, "Club"), formData);

      // Wait for the promise to resolve before calling saveInfo
      await saveInfo(docRef.id);

      setClubTempId(docRef.id); // Set Clubtempid after saveInfo

      // Clear form fields
      setFormData({
        clubID: "",
        clubName: "",
        pNumber: "",
        clubP: "",
        bDesc: "",
        clubDesc: "",
        clubAppReq: [],
        clubFacebook: "",
        clubLinkedIn: "",
        clubStatus: "",
        clubTelegram: "",
        clubLogoURL: "",
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
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    marginTop: "80px",
    marginBottom: "80px",
  };

  const formStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
    width: "50vh",
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: "15px",
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleImageChange = (Club: React.ChangeEvent<HTMLInputElement>) => {
    const file = Club.target.files?.[0];

    if (file) {
      setImageInfo(URL.createObjectURL(file), file);
    }
  };
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const saveInfo = async (ClubId: string) => {
    try {
      if (image) {
        const storageRef = ref(getStorage(), `Club/${ClubId}/picture`);

        // Upload the image
        await uploadBytes(storageRef, image);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update the Firestore document with the updated image URL
        await updateDoc(doc(db, "Club", ClubId), {
          ...formData,
          ClubImage: downloadURL,
        });
      } else {
        console.log("No picture");
      }
    } catch (error) {
      console.error("Error saving information:", error);
    }
  };

  const { TextArea } = Input;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-left">
          <Form
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="Club Name"
              name="clubName"
              rules={[{ required: true, message: "Please input club name!" }]}
            >
              <Input onChange={handleChange} value={formData.clubName} />
            </Form.Item>

            <Form.Item
              label="President Name"
              name="clubP"
              rules={[
                { required: true, message: "Please input president name!" },
              ]}
            >
              <Input onChange={handleChange} value={formData.clubP} />
            </Form.Item>

            <Form.Item
              label="President Number"
              name="pNumber"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input
                placeholder="(+601139969137)"
                onChange={handleChange}
                value={formData.pNumber}
              />
            </Form.Item>

            <Form.Item
              label="Brief Description"
              name="bDesc"
              rules={[
                { required: true, message: "Please input Brief Description!" },
              ]}
            >
              <Input
                placeholder="A brief secription"
                onChange={handleChange}
                value={formData.bDesc}
              />
            </Form.Item>

            <Form.Item
              label="Requirements"
              name="clubName"
              rules={[{ required: true, message: "Please input club name!" }]}
            >
              <Checkbox>CV</Checkbox>
              <Checkbox>Personality Test</Checkbox>
              <Checkbox>Introductory video</Checkbox>
              <Checkbox>Personal photo</Checkbox>
            </Form.Item>
          </Form>
        </div>
        <div className="form-right">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Club Description"
              name="clubName"
              rules={[{ required: true, message: "Please input club name!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="LinkedIn Link"
              name="clubLinkedIn"
              rules={[
                { required: true, message: "Please input LinkedIn link!" },
              ]}
            >
              <Input onChange={handleChange} value={formData.clubLinkedIn} />
            </Form.Item>

            <Form.Item
              label="Telegram Link"
              name="clubTelegram"
              rules={[
                { required: true, message: "Please input Telegram link!" },
              ]}
            >
              <Input onChange={handleChange} value={formData.clubTelegram} />
            </Form.Item>

            <Form.Item
              label="Facebook Link"
              name="clubFacebook"
              rules={[
                { required: true, message: "Please input Facebook link!" },
              ]}
            >
              <Input onChange={handleChange} value={formData.clubFacebook} />
            </Form.Item>

            <Form.Item label="Button">
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
