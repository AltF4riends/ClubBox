import { PieChart } from "@mui/x-charts/PieChart";
import "./PieActiveArc.css"; // Import CSS file for styling
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface ChartData {
  id: number;
  value: number;
  label: string;
}

export default function PieActiveArc() {
  const [dataFromDB, setDataFromDB] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Statistic"));
        const data: ChartData[] = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.data().id,
            value: doc.data().value,
            label: doc.data().label,
          });
        });
        setDataFromDB(data);
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchDataFromFirebase();
  }, []);

  return (
    <div className="pie-chart-container">
      <PieChart
        series={[
          {
            data: dataFromDB,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
      />
    </div>
  );
}
