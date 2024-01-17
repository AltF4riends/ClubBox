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

  const [ChartData, setChartData] = useState({
    id: "",
    Value: "",
    Label: "",
  });

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Statistic"));
        console.log("length", querySnapshot.docs.length);
        const data: ChartData[] = [];
        querySnapshot.forEach((doc) => {
          const ids = doc.data().id;
          const values = doc.data().value;
          const labels = doc.data().label;

          // Transform data into correct format
          for (let i = 0; i < ids.length; i++) {
            data.push({
              id: ids[i],
              value: values[i],
              label: labels[i],
            });
          }
        });
        console.log("Data fetched from Firebase:", data);
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
