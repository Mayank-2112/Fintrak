import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Inside MenuContent function:


const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, tab: 'home' },
  { text: 'Products', icon: <AnalyticsRoundedIcon />, tab: 'products' },
  { text: 'Clients', icon: <PeopleRoundedIcon />, tab: 'clients' },
  { text: 'Sales', icon: <ReceiptIcon />, tab: 'sales' },
  { text: 'Purchases', icon: <AssignmentRoundedIcon />, tab: 'purchases' },
  { text: 'Departments', icon: <GroupsIcon />, tab: 'departments' },
];


export default function MenuContent() {

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const activeTab = urlParams.get('tab');

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <Link to={`/dashboard?tab=${item.tab}`} style={{ textDecoration: 'none' }}>
              <ListItemButton selected={activeTab === item.tab}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

    </Stack>
  );
}
