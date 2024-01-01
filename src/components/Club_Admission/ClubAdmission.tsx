import { useState, useEffect } from "react";
import { Card } from "antd";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref } from "firebase/storage";
import "./ClubAdmission.css";
import { useNavigate } from "react-router-dom";

const ClubAdmission = () => {
  const [eventData, setEventData] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleLoad = async () => {
    const docRef = collection(db, "Club");
    const docSnap = await getDocs(docRef);

    const newData = docSnap.docs.map((e) => ({
      id: e.id,
      title: e.data().clubName,
      description: e.data().B_Desc,
      image: e.data().clubLogo,
    }));

    setEventData(newData);
  };

  const handleEventSelect = (event: any) => {
    navigate(`/manage_club/${event.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleLoad();
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="club-admission-container">
        <div>
          <div>
            <h1 style={{ color: "white" }}>Clubs</h1>

            <div className="row">
              {eventData.map((event) => (
                <div className="col-md-4 mb-4" key={event.id}>
                  <Card
                    cover={<img alt={event.title} src={event.image} />}
                    title={event.title}
                    onClick={() => handleEventSelect(event)}
                  >
                    <p>{event.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClubAdmission;
