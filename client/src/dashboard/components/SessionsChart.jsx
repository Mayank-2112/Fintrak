import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function SessionsChart() {
  const theme = useTheme();

  const [purchases, setPurchases] = React.useState([]);
  const [sales, setSales] = React.useState([]);
  const [monthlySales, setMonthlySales] = React.useState([]);
  const [monthlyPurchases, setMonthlyPurchases] = React.useState([]);

  React.useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/server/purchase/getall`);
        const data = await res.json();
        if (res.ok) setPurchases(data.purchases);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSales = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/server/sale/getall`);
        const data = await res.json();
        if (res.ok) setSales(data.sales);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPurchases();
    fetchSales();
  }, []);

  React.useEffect(() => {
    function getMonthlyData(data, dateKey) {
      const monthlyData = {};
      data.forEach(({ amount, [dateKey]: date }) => {
        if (!date) return;
        const month = new Date(date).toISOString().slice(0, 7);
        monthlyData[month] = (monthlyData[month] || 0) + amount;
      });

      return Object.entries(monthlyData).map(([month, total]) => ({ month, total }));
    }

    setMonthlySales(getMonthlyData(sales, 'saleDate'));
    setMonthlyPurchases(getMonthlyData(purchases, 'purchaseDate'));
  }, [sales, purchases]);

  const sortedMonths = [...new Set([...monthlySales, ...monthlyPurchases].map(d => d.month))].sort();

  const revenueData = sortedMonths.map(month => {
    const found = monthlySales.find(d => d.month === month);
    return found ? found.total : 0;
  });

  const profitData = sortedMonths.map(month => {
    const salesFound = monthlySales.find(d => d.month === month);
    const purchasesFound = monthlyPurchases.find(d => d.month === month);
    return (salesFound ? salesFound.total : 0) - (purchasesFound ? purchasesFound.total : 0);
  });

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Revenue vs Profits
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Monthly comparison of Revenue and Profit
          </Typography>
        </Stack>
        <LineChart
          colors={[theme.palette.primary.main, theme.palette.secondary.main]}
          xAxis={[
            {
              scaleType: 'point',
              data: sortedMonths,
            },
          ]}
          series={[
            {
              id: 'revenue',
              label: 'Revenue',
              data: revenueData,
              showMark: false,
              curve: 'linear',
              area: true,
              stack: 'total',
              stackOrder: 'ascending',
            },
            {
              id: 'profit',
              label: 'Profits',
              data: profitData,
              showMark: false,
              curve: 'linear',
              area: true,
              stack: 'total',
              stackOrder: 'ascending',
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-revenue': {
              fill: "url('#revenueGradient')",
            },
            '& .MuiAreaElement-series-profit': {
              fill: "url('#profitGradient')",
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.main} id="revenueGradient" />
          <AreaGradient color={theme.palette.secondary.main} id="profitGradient" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
