import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, ResponsiveContainer, ComposedChart, Legend, Label } from "recharts";
import regression from 'regression';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1e1e2e", 
        color: "#cdd6f4", 
        padding: "10px", 
        borderRadius: "5px", 
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
      }}>
        <p>{`Month: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name} : {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CombinedChart = ({show}) => {
const [sales, setSales] = React.useState([]);
  const [monthlySales, setMonthlySales] = React.useState([]);
      
  React.useEffect(() => {
      const fetchSales = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_PORT}/server/sale/getall`);
          const data = await res.json();
  
          if (res.ok) {
            console.log(data);
            
            setSales(data.sales);
          }
  
        } catch (error) {
          console.log(error);
  
        }
      };
      fetchSales();
    }, []);
  
  
    function getMonthlySales(salesData) {
      const monthlySales = {};
    
      salesData.forEach(({ amount, saleDate }) => {
        if (!saleDate) {
          console.warn("Skipping entry due to missing saleDate:", { amount, saleDate });
          return;
        }
    
        const dateObj = new Date(saleDate);
        if (isNaN(dateObj.getTime())) {
          console.warn("Skipping entry due to invalid saleDate:", saleDate);
          return;
        }
    
        const month = dateObj.toISOString().slice(0, 7); // Extract YYYY-MM
    
        if (!monthlySales[month]) {
          monthlySales[month] = 0;
        }
    
        monthlySales[month] += amount;
      });
    
      return Object.entries(monthlySales).map(([month, total]) => ({ month, total }));
    }
    
  React.useEffect(() => {
    setMonthlySales(getMonthlySales(sales));
    
  }, [sales]);
  
  monthlySales.sort((a, b) => a.month.localeCompare(b.month));

  const formattedData = React.useMemo(()=>{
    
    const formatted = monthlySales.map(
      ({ total }, i) => {
        return [i, total];
      }
    );
    
    const regressionLine = regression.linear(formatted);
    
    return monthlySales.map(({ month, total }, i) => {
      return {
        name: month,
        "Actual Revenue": total,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  },[monthlySales]);

  


   

  return (
    
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='#44475a' />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} stroke="#f8f8f2">
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[40000, 150000]}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
            stroke="#f8f8f2"
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              offset={-5}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip content={CustomTooltip}/>
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke='#00ffcc'
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {show && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke="#FF00FF"
            />
          )};
        </LineChart>
      </ResponsiveContainer>  );
};

export default CombinedChart;
