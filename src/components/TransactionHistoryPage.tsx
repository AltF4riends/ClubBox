import React from "react";
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";
import TransactionHistory from "./THistoryPage/TransactionHistory";

function TransactionHistoryPage() {
  return (
    <div>
      <NavBar />
      <TransactionHistory/>
      <Footer />
    </div>
  );
}

export default TransactionHistoryPage;
