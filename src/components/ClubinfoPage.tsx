import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import "./HomePage/Slider.css";
import { Breadcrumb } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./ProfilePage.css"; // Import the CSS file
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useImageContext } from "./ImageContext";

import { Card, Col, Row } from "antd";

function Clubinfo() {
  // Assuming you have an array of image URLs or objects representing images
  const imageTitles = ["Image 1", "Image 2", "Image 3"];

  return (
    <Row gutter={16}>
      {imageTitles.map((title, index) => (
        <Col key={index} span={8}>
          <Card title={title} bordered={false}>
            Card content
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Clubinfo;
