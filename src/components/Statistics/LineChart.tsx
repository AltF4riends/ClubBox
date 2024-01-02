import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./SimpleLineChart.css"; // Import CSS file for styling
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Replace "./firebase" with the correct path to your Firebase configuration

interface SimpleLineChartData {
  data: number[]; // Adjust this based on your data structure
  label: string;
}

const SimpleLineChart = () => {
  const [linechartData, setChartData] = useState<SimpleLineChartData[]>([]);

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

        setChartData(data);
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
        series={linechartData}
        // Assuming you have labels to display on the X-axis
        // Ensure labels is an array of strings corresponding to each data point
        xAxis={[
          { scaleType: "point", data: linechartData.map((data) => data.label) },
        ]}
      />
    </div>
  );
};

export default SimpleLineChart;
