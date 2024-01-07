import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./SimpleLineChart.css"; // Import CSS file for styling
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Replace with your Firebase configuration

interface SimpleLineChartData {
  data: number[];
  label: string;
}

export default function SimpleLineChart() {
  const [simpleLineChartData, setSimpleLineChartData] = useState<
    SimpleLineChartData[]
  >([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Statistic"));
        const data: SimpleLineChartData[] = [];

        querySnapshot.forEach((doc) => {
          data.push({
            data: doc.data().data || [],
            label: doc.data().label || "No Label",
          });
        });

        setSimpleLineChartData(data);
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchDataFromFirebase();
  }, []);

  return (
    <div className="chart-container">
      <LineChart
        width={500}
        height={300}
        series={simpleLineChartData}
        xAxis={[
          {
            scaleType: "point",
            data: simpleLineChartData.map((data) => data.label),
          },
        ]}
      />
    </div>
  );
}
