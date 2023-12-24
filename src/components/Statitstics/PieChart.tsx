import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./PieActiveArc.css"; // Import CSS file for styling

const data = [
  { id: 0, value: 61, label: "Male" },
  { id: 1, value: 39, label: "Female" },
];

export default function PieActiveArc() {
  return (
    <div className="pie-chart-container">
      {/* Assign the CSS class */}
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
      />
    </div>
  );
}
