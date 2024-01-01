import React, { useEffect, useState } from "react";
import NavBar from "../HomePage/NavBar";
import Footer from "../HomePage/Footer";
import { Checkbox, Divider, Button, Popover, Spin } from "antd";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { auth, db } from "../../firebase";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { onAuthStateChanged } from "@firebase/auth";

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

const CartPage: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<CartInfo[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [useName, setuserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user.uid);
        console.log(user.uid);
      } else {
        setUserID(null);
      }
    });

    // Cleanup function to unsubscribe from the observer when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once on mount

  useEffect(() => {
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
  }, [userID]);

  useEffect(() => {
    const totalItems = cartData.length;
    const checkedItems = checkedList.length;

    setIndeterminate(checkedItems > 0 && checkedItems < totalItems);
    setCheckAll(checkedItems === totalItems);
  }, [checkedList, cartData]);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const allEventIds = cartData.map((item) => item.eventId);

    setCheckedList(e.target.checked ? allEventIds : []);
  };

  const onChange = (eventId: string) => {
    const newCheckedList = [...checkedList];
    const index = newCheckedList.indexOf(eventId);

    if (index === -1) {
      newCheckedList.push(eventId);
    } else {
      newCheckedList.splice(index, 1);
    }

    setCheckedList(newCheckedList);
  };

  if (loading) {
    return <Spin size="large" fullscreen />;
  }

  if (error) {
    return <p style={{ color: "white" }}>Error: {error}</p>;
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "rgba(208,61,86,0.9)",
            height: "150vh",
            width: "98.7vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255)",
              height: "auto",
              width: "50vw",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "40px",
              borderRadius: "15px",
            }}
          >
            <h1
              style={{
                margin: "30px",
              }}
            >
              {" "}
              Cart List
            </h1>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check all
            </Checkbox>
            <Divider />
            {cartData.map((cartItem, index) => (
              <div key={cartItem.id}>
                <Popover
                  title={`Event ID: ${cartItem.eventId}`}
                  content={`Details: 
                    Payment Status: ${cartItem.paymentStatus}
                    Amount: ${cartItem.paymentAmount}
                    Due Date: ${cartItem.paymentDue}`}
                >
                  <Button style={{ width: "20vw", height: "7vh" }}>
                    <Checkbox
                      onChange={() => onChange(cartItem.eventId)}
                      checked={checkedList.includes(cartItem.eventId)}
                      style={{ width: "20vw" }}
                    >
                      {cartItem.paymentStatus}
                    </Checkbox>
                  </Button>
                </Popover>
                <Divider />
              </div>
            ))}
            <Button
              type="primary"
              style={{
                width: "20vw",
                height: "7vh",
                backgroundColor: "maroon",
              }}
            >
              Proceed To Pay
            </Button>
            <Divider />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
