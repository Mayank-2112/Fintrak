import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
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

  const purchaseData = sortedMonths.map(month => {
    const found = monthlyPurchases.find(d => d.month === month);
    return found ? found.total : 0;
  });

  const salesData = sortedMonths.map(month => {
    const found = monthlySales.find(d => d.month === month);
    return found ? found.total / 10 : 0; // Dividing sales data by 10
  });

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Purchases VS Sales (Sales Data ÷ 10)
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Comparison between Purchases and Sales for the past year
          </Typography>
        </Stack>
        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: sortedMonths,
            },
          ]}
          series={[
            {
              id: 'purchase',
              label: 'Purchase',
              data: purchaseData,
              stack: 'A',
            },
            {
              id: 'sales',
              label: 'Sales (Divided by 10)',
              data: salesData,
              stack: 'A',
            },
          ]}
          height={250}
        />
      </CardContent>
    </Card>
  );
}
