import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import CombinedChart from './CombinedChart';


export default function MainGrid() {
  const [open, setOpen] = React.useState(false);
      const [clients, setClients] = React.useState([]);
      const [products, setProducts] = React.useState([]);
      const [sales, setSales] = React.useState([]);
      const [lastMonthSales, setLastMonthSales] = React.useState(null);
      const [users, setUsers] = React.useState(null);
      const [productCount, setProductCount] = React.useState(null);
      
      function getPerDay(category) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth()-1; // 0-based index
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Initialize an array with 0s for each day of the current month
        const categoryData = new Array(daysInMonth).fill(0);
      
        category.forEach(indx => {
          if (indx.saleDate){
            const salesDate = new Date(indx.saleDate);

            const indxMonth = salesDate.getMonth();
            const indxYear = salesDate.getFullYear();
            const day = salesDate.getDate(); // 1-based index
            
            // Ensure the client belongs to the current month and year
            if (indxMonth === month && indxYear === year) {
              categoryData[day - 1] += indx.amount; // Subtract 1 since array index starts at 0
              
            }
          }
          else if (indx.createdAt) {
            const createdAtDate = new Date(indx.createdAt);
            
            const indxMonth = createdAtDate.getMonth();
            const indxYear = createdAtDate.getFullYear();
            const day = createdAtDate.getDate(); // 1-based index
            
            // Ensure the client belongs to the current month and year
            if (indxMonth === month && indxYear === year) {
              categoryData[day - 1] += 1; // Subtract 1 since array index starts at 0
              
            }
          }
        });
        
        return categoryData;
      }
      
      React.useEffect(() => {
        const fetchClients = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/server/client/getall`);
            const data = await res.json();
      
            if (res.ok) {
              setClients(data.clients);
              setUsers(data.lastMonthClients)
            }
          } catch (error) {
            console.log(error);
          }
        };

        const fetchProducts = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/server/product/getall`);
            const data = await res.json();
      
            if (res.ok) {
              setProducts(data.products);
              setProductCount(data.lastMonthProducts);
            }
          } catch (error) {
            console.log(error);
          }
        };

        const fetchSales = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/server/sale/getall`);
            const data = await res.json();
            
            if (res.ok) {
              
              setSales(data.sales);
              setLastMonthSales(data.totalSalesLast32Days);
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchClients();
        fetchSales();
        fetchProducts();
      }, []);
      
      
      
      const clientsData = getPerDay(clients);
      const productsData = getPerDay(products);
      const salesData = getPerDay(sales);

      console.log(salesData,productsData);
      console.log(products);
      
      const dataCard = [
        {
          title: 'Total Clients',
          value: users ?? 0, // Ensuring it's not null
          interval: 'Last 30 days',
          trend: 'up',
          data: clientsData,
        },
        {
          title: 'Sales',
          value: (lastMonthSales / 1000), // Ensuring it's not null
          interval: 'Last 30 days',
          trend: 'down',
          data: salesData
        },
        {
          title: 'Total Products',
          value: productCount ?? 0, // Ensuring it's not null
          interval: 'Last 30 days',
          trend: 'neutral',
          data: productsData 
        },
      ];
      
  
  
      const handleClickOpen = () => {
          setOpen(true);
      };
  
      const handleClose = () => {
          setOpen(false);
          setEditClient(null);
      };
  
      
      // Example usage inside useEffect:
      
      
  
      const handleEditClick = (client) => {
          setEditClient(client);
          setOpen(true);
      };
  
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {dataCard.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <CustomizedDataGrid category={'client'} open={open} data={clients} setData={setClients} handleEditClick={handleEditClick} />        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            {/* <CustomizedTreeView /> */}
            <ChartUserByCountry />
          </Stack>
        </Grid>
        <CombinedChart/>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
