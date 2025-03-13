import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  const [purchases, setPurchases] = React.useState([]);
  const [sales, setSales] = React.useState([]);
  const [monthlySales, setMonthlySales] = React.useState([]);
  const [monthlyPurchases, setMonthlyPurchases] = React.useState([]);


  React.useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/server/purchase/getall`);
        const data = await res.json();

        if (res.ok) {
          setPurchases(data.purchases);
        }

      } catch (error) {
        console.log(error);

      }
    };
    fetchPurchases();
    const fetchSales = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PORT}/server/sale/getall`);
        const data = await res.json();

        if (res.ok) {

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
  // setMonthlyPurchases(getMonthlySales(purchases));

  // console.log("Updated Monthly Purchases:", monthlyPurchases);
  // console.log("Updated Monthly Sales:", monthlySales);
}, [sales, purchases]);
monthlySales.sort((a, b) => a.month.localeCompare(b.month));


  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Purchases VS Sales
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Comparison between Purchases and Sales for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: ['Aug24', 'Sept24', 'Oct24', 'Nov24', 'Dec24', 'Jan25', 'Feb25'],
            },
          ]}
          series={[
            {
              id: 'page-views',
              label: 'Purchase',
              data: [2234, 3872, 2998, 4125, 3357, 2789, 2998],
              stack: 'A',
            },
            {
              id: 'downloads',
              label: 'Sales',
              data: [3098, 4215, 2384, 2101, 4752, 3593, 2384],
              stack: 'A',
            },

          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
