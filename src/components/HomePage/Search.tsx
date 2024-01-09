import "./Search.css"; // Import the CSS file
import React, { useState, useEffect } from "react";
import { AutoComplete, Input, Spin } from "antd";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";

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

const eventData: EventInfo[] = [
  {
    id: "1",
    title: "",
    description: "",
    image: "",
    clubId: "",
    logo: "",
    price: "",
    date: "",
    location: "",
  },
  // Add more events as needed
];

function Search() {
  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [logos, setLogos] = useState("");
  const eventNames: string[] = [];
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [count, setCount] = useState(0);

  const handleSearch = (value: string) => {
    console.log("**Handles**");
    const filteredOptions = eventNames
      .filter((eventName) =>
        eventName.toLowerCase().includes(value.toLowerCase())
      )
      .map((eventName) => ({ value: eventName }));
    setOptions(filteredOptions);
  };

  async function handleLogo(clubId: string) {
    try {
      const docClubRef = doc(db, "Club", clubId);
      const docClubSnap = await getDoc(docClubRef);
      if (docClubSnap.exists()) {
        const data = docClubSnap.data();
        return data.clubLogo;
      } else {
        console.log("The Club Does not exist");
        return "";
      }
    } catch (error) {
      console.error("Error fetching club data:", error);
      return "";
    }
  }

  useEffect(() => {
    const handleLoad = async () => {
      try {
        console.log("handleLoad");
        const currentDate = getCurrentDate("-");
        console.log(currentDate);
        const q = query(
          collection(db, "Event"),
          where("eventDate", ">=", currentDate)
        );
        const querySnapshot = await getDocs(q);

        const newEventNames: string[] = [];
        for (const e of querySnapshot.docs) {
          const newEvent: EventInfo = {
            id: e.id,
            title: e.data().eventName,
            description: e.data().eventDesc,
            clubId: e.data().clubID,
            image: e.data().eventImage,
            logo: "",
            price: e.data().eventFee,
            date: e.data().eventDate,
            location: e.data().eventLocation,
          };
          var tempname: string = e.data().eventName;
          newEventNames.push(tempname);

          eventNames.push(tempname.toLowerCase());
          eventData.push(newEvent);

          const logo = await handleLogo(e.data().clubID);
          newEvent.logo = logo;
        }

        setOptions(newEventNames.map((eventName) => ({ value: eventName })));
        setCount(newEventNames.length);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Error fetching event data");
      } finally {
        setLoading(false);
      }
    };

    handleLoad();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p style={{ color: "white" }}>Error: {error}</p>;
  }

  return (
    <div className="search-container">
      <div className="contact">
        <form>
          <AutoComplete
            style={{ width: 300 }}
            autoFocus={true}
            options={options}
            onSearch={handleSearch}
            size="large"
          >
            <Input.Search size="middle" placeholder="input here" enterButton />
          </AutoComplete>
        </form>
      </div>
      <div className="dropdown">
        <button
          className="btn"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>
        <button
          className="btn btn-secondary dropdown-toggle details"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filters
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Social Science{" "}
                </label>
              </div>
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Electrical{" "}
                </label>
              </div>
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Computing{" "}
                </label>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Search;
