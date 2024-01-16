// Import necessary modules and components
import "./Search.css";
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
import Cards from "./Cards";

// Define the EventInfo interface
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

// Initialize the eventData array
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

const eventSearch: EventInfo[] = [
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

// Define the Search component
function Search() {
  // Define the getCurrentDate function
  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  // Define state variables
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [eventNames, setEventNames] = useState<string[]>([]);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [count, setCount] = useState(0);
  const startIndex = 0;
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Define the handleSearch function
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filteredOptions = eventNames
      .filter((eventName) => eventName.includes(value.toLowerCase()))
      .map((eventName) => ({ value: eventName }));
    setOptions(filteredOptions);
  };

  const handleClickSearch = (value: string) => {
    eventSearch.length = 0;
    eventSearch.splice(0, eventSearch.length);

    options.forEach((option) => {
      const matchingEvent = eventData.find(
        (event) => event.title.toLowerCase() === option.value.toLowerCase()
      );
      if (matchingEvent) {
        eventSearch.push(matchingEvent);
      }
    });

    console.log("eventSearch:", eventSearch);
  };

  // Define the handleLogo function
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

  // Define the useEffect hook
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
          newEventNames.push(tempname.toLowerCase());

          eventData.push(newEvent);

          const logo = await handleLogo(e.data().clubID);
          newEvent.logo = logo;
        }

        setOptions(newEventNames.map((eventName) => ({ value: eventName })));
        setEventNames(newEventNames);
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

  // Return the JSX structure
  return (
    <div className="search-container">
      <div className="contact">
        <form>
          <AutoComplete
            style={{ width: 500 }}
            autoFocus={true}
            options={options}
            onChange={handleSearch}
            size="large"
          >
            <Input.Search
              size="large"
              placeholder="input here"
              enterButton
              onChange={() => handleClickSearch()}
            />
          </AutoComplete>
        </form>
      </div>

      {searchQuery && ( // Render results only if there is a search query
        <div
          style={{
            margin: "50px 150px",
            background: "rgba(255,255,255, 0.6)",
            borderRadius: "20px",
          }}
        >
          <p style={{ marginLeft: "30px" }}>Search Result:</p>
          {[0, 1, 2].map((index) => {
            const startIndex = index * 3;
            const endIndex = startIndex + 3;

            return (
              <div key={index} className={` ${index === 0 ? "active" : ""}`}>
                <div
                  className="d-flex justify-content-between"
                  style={{
                    margin: "30px 150px",
                  }}
                >
                  {eventSearch
                    .slice(startIndex, endIndex)
                    .map(
                      (event, subIndex) =>
                        event.title && (
                          <Cards
                            key={`${index}-${subIndex}`}
                            image={event.image}
                            title={event.title}
                            desc={event.description}
                            price={event.price}
                            logo={event.logo}
                            eventId={event.id}
                          />
                        )
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Export the Search component
export default Search;
