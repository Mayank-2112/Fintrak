import React, { useEffect, useState } from "react";
import regression from "regression";
import { ComposedChart, Line, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const salesData = [
  { month: "2024-03", total: 49000 },
  { month: "2024-04", total: 134400 },
  { month: "2024-05", total: 116000 },
  { month: "2024-06", total: 98000 },
  { month: "2024-07", total: 166900 },
  { month: "2024-08", total: 49500 },
  { month: "2024-09", total: 68000 },
  { month: "2024-10", total: 93000 },
  { month: "2024-11", total: 92900 },
  { month: "2024-12", total: 49000 },
  { month: "2025-01", total: 79500 },
  { month: "2025-02", total: 101000 },
  { month: "2025-03", total: 53000 }
];

const CombinedChart = () => {
  const [regressionData, setRegressionData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);

  useEffect(() => {
    // Convert month (YYYY-MM) to numerical format for regression calculations
    const formattedData = salesData.map(({ month, total }) => [
      parseInt(month.replace("-", "")), total
    ]);

    // Perform linear regression
    const result = regression.linear(formattedData);

    // Generate regression line values for existing months
    const regressionPoints = salesData.map(({ month }) => ({
      month,
      lineValue: result.predict(parseInt(month.replace("-", "")))[1]
    }));

    // Generate predicted values for the next 12 months, shifting labels
    const lastMonth = parseInt(salesData[salesData.length - 1].month.replace("-", ""));
    const futurePredictions = Array.from({ length: 12 }, (_, i) => {
      const futureMonth = lastMonth + (i + 1); // Increment month
      const predictedValue = result.predict(futureMonth)[1];

      // Shift the month to be exactly one year ahead
      const shiftedMonth = (futureMonth + 10000).toString().replace(/(\d{4})(\d{2})/, "$1-$2");

      return { month: shiftedMonth, predictedValue };
    });

    setRegressionData(regressionPoints);
    setPredictedData(futurePredictions);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={600}>
      <ComposedChart data={[...salesData, ...predictedData]} style={{ backgroundColor: "#1c1e26", padding: "10px", borderRadius: "10px" }}>
        <CartesianGrid stroke="#44475a" strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          stroke="#f8f8f2" 
          label={{ value: "Time (Months)", position: "insideBottom", offset: -5, fill: "#f8f8f2", style: { fontSize: "14px", fontWeight: "bold" }}} 
        />
        <YAxis 
          stroke="#f8f8f2" 
          label={{ value: "Revenue ($)", angle: -90, position: "insideLeft", offset: -5, fill: "#f8f8f2", style: { fontSize: "14px", fontWeight: "bold" }}}
        />
        <Tooltip />
        <Legend verticalAlign="top" />

        {/* Regression Line */}
        <Line type="monotone" name="Regression Line" data={regressionData} dataKey="lineValue" stroke="#4a90e2" strokeWidth={2} dot={false} />

        {/* Scatter Plot for Actual Sales */}
        <Scatter dataKey="total" fill="#00ffcc" name="Actual Sales" />

        {/* Dotted Line for Predicted Sales (shifted 1 year ahead) */}
        <Line type="monotone" name="Predicted Revenue (Next Year)" data={predictedData} dataKey="predictedValue" stroke="#ffffff" strokeWidth={2} strokeDasharray="5 5" dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CombinedChart;
