import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { useLocation } from 'react-router-dom';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import CustomizedDataGrid from './components/CustomizedDataGrid';
import { Products } from './sideMenu/Products';
import { Clients } from './sideMenu/Clients';
import { Sales } from './sideMenu/Sales';
import { Purchases } from './sideMenu/Purchases';
import { Departments } from './sideMenu/Departments';
import AlertDialogSlide from './components/AlertDialogSlide';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const location = useLocation();
  const [tab,setTab] = React.useState('home');
  React.useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header activeTab={tab}/>
            { tab === 'home' &&  <MainGrid/>}
            { tab === 'profile' &&  <AlertDialogSlide/>}
            { tab === 'products' &&  <Products/>}
            { tab === 'clients' &&  <Clients/>}
            { tab === 'purchases' &&  <Purchases/>}
            { tab === 'sales' && <Sales/>}
            { tab === 'departments' && <Departments/>}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
