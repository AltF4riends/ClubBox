import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./SimpleLineChart.css"; // Import CSS file for styling

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export default function SimpleLineChart() {
  return (
    <div className="chart-container">
      {" "}
      {/* Assign the CSS class */}
      <LineChart
        width={500}
        height={300}
        series={[
          { data: pData, label: "Students" },
          { data: uData, label: "Guests" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      ></LineChart>
    </div>
  );
}
