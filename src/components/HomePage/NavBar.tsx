import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../RegisterPagePD/AuthContextAlpha";
import { useImageContext } from "../ImageContext"; // Import the context
import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { Avatar, Badge, Space } from "antd";

interface CartInfo {
  id: string;
  eventId: string;
  clubId: string;
  studentId: string;
  paymentAmount: string;
  paymentDate: string;
  paymentStatus: string;
  paymentDue: string;
  paymentMethod: string;
}

const NavBar = () => {
  const navigate = useNavigate();
  const { signOut } = UserAuth();
  const { imageUrl } = useImageContext();
  const [error, setError] = useState("");
  const [userAccess, setUserAccess] = useState<string | null>(null); // State to store user access level
  const [userID, setUserID] = useState<string | null>(null);
  const [cartData, setCartData] = useState<CartInfo[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartNumber, setcartNumber] = useState(0);
  // Use state to force a re-render when the image URL changes
  const [, setForceRender] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
      } else {
        setUserID(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    let i = 0;
    const handleLoad = async () => {
      try {
        console.log("handleLoad");
        console.log(userID);
        const q = query(
          collection(db, "Payment"),
          where("paymentStatus", "==", "unpaid"),
          where("studentID", "==", userID)
        );
        const querySnapshot = await getDocs(q);

        const newCartData: CartInfo[] = [];

        querySnapshot.forEach((e) => {
          const cart: CartInfo = {
            id: e.id,
            eventId: e.data().eventID,
            clubId: e.data().clubID,
            studentId: e.data().studentID,
            paymentAmount: e.data().paymentAmount,
            paymentDate: e.data().paymentDate,
            paymentStatus: e.data().paymentStatus,
            paymentDue: e.data().paymentDue,
            paymentMethod: e.data().paymentMethod,
          };
          newCartData.push(cart);
          i++;
          setcartNumber(i);
        });

        setCartData(newCartData);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setError("Error fetching event data");
      } finally {
        setLoading(false);
      }
    };
    handleLoad();
    const fetchUserAccess = async () => {
      if (userID) {
        const docRef = doc(db, "Student", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserAccess(userData.accessLevel);
          console.log(userAccess); // Assuming access is a string, adjust accordingly
        } else {
          console.log("No document");
        }
      }
    };

    fetchUserAccess();
  }, [userID]);
  useEffect(() => {
    // This effect will trigger a re-render when the imageUrl changes
    setForceRender({});
  }, [imageUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signOut();
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        console.log(e.message);
      }
    }
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bs-body-tertiary"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: "white" }}>
          <img src="public/ClubBox.png" width="80" height="30" alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="d-flex justify-content-end align-items-center collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <Link to={"/home"}>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ color: "white" }}
                >
                  Home
                </a>
              </li>
            </Link>
            {userAccess != "admin" && (
              <li className="nav-item">
                <Link
                  to="/Cart"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  Cart
                  <Badge
                    count={cartNumber}
                    overflowCount={99}
                    offset={[2, -20]}
                    size="small"
                  ></Badge>
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to="/Clubs" className="nav-link" style={{ color: "white" }}>
                Clubs
              </Link>
            </li>
            {userAccess == "admin" && (
              <li className="nav-item">
                <Link
                  to="/manage_club"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  Manage Club
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/CalendarMain"
                style={{ color: "white" }}
              >
                Calendar
              </Link>
            </li>
            {userAccess != "admin" && (
              <Link to={"/faqpage"}>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    aria-disabled="true"
                    style={{ color: "white" }}
                  >
                    FAQ
                  </a>
                </li>
              </Link>
            )}

            {userAccess == "admin" && (
              <Link
                className="nav-link"
                to="/NewEventComp"
                style={{ color: "white" }}
              >
                Add Event
              </Link>
            )}
          </ul>
          <div
            className="dropdown"
            style={{
              border: "5px solid maroon",
              borderRadius: "70%",
              display: "flex",
              alignItems: "center",
              marginRight: "5px",
              marginLeft: "10px",
              padding: "1px",
            }}
          >
            <button
              style={{
                display: "flex",
                marginRight: "2px",
                marginLeft: "2px",
                padding: "2px",
              }}
              className="btn"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <img
                className="rounded-circle"
                height="27"
                width="27"
                src={imageUrl || "public/profile.png"}
                alt="Profile"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <div className="dropdown-item">
                  <Link
                    to="/ProfilePage"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {" "}
                    Profile
                  </Link>
                </div>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Admission
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleSubmit}>
                  <button type="button" className="btn btn-danger">
                    Log out
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
