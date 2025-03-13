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
      const [users, setUsers] = React.useState(null);
      const [editClient, setEditClient] = React.useState(null);
      const [sales, setSales] = React.useState(null);

      // if (sales > 1000000)
      const dataCard = [
        {
          title: 'Total Clients',
          value: users ?? 0, // Ensuring it's not null
          interval: 'Last 30 days',
          trend: 'up',
          data: [1,1,2,2,3,3,3,4,4,4,5,5,5,6,6,6,10,10,11,14,15,15,16,16,19,19,19,20],
        },
        {
          title: 'Sales',
          value: '253K',
          interval: 'Last 30 days',
          trend: 'down',
          data: [1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 750, 920, 820, 840, 600, 820, 780, 800, 760, 380, 740, 660, 820, 840, 700, 520, 480, 700, 660, 500, 520],
        },
        {
          title: 'Total Products',
          value: 9,
          interval: 'Last 30 days',
          trend: 'neutral',
          data: [500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510],
        },
      ];
      
  
  
      const handleClickOpen = () => {
          setOpen(true);
      };
  
      const handleClose = () => {
          setOpen(false);
          setEditClient(null);
      };
  
      React.useEffect(() => {
          const fetchClients = async () => {
              try {
                  const res = await fetch(`${import.meta.env.VITE_PORT}/server/client/getall`);
                  const data = await res.json();
                  
                  if (res.ok) {
                      setClients(data.clients);
                      setUsers(data.lastMonthClients);
                  }
  
              } catch (error) {
                  console.log(error);
  
              }
          };
          fetchClients();
          

      }, []);
  

  
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
