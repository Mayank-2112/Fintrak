import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import PersonIcon from '@mui/icons-material/Person';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import fintrakLogo from '../../assets/fintrak-logo.png';
import { signOutSuccess } from '../../redux/userSlice';
import AlertDialogSlide from './AlertDialogSlide';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const { currentUser } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PORT}/server/auth/signout`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
      }
      else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <img src={fintrakLogo} alt="logo" width='200px' />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
        {/* <CardAlert /> */}
      </Box>
      <Stack sx={{ p: 2, gap: 2 }}>
        <Button variant="outlined" fullWidth startIcon={<PersonIcon />} onClick={handleClickOpen}>
          Profile
        </Button>
        <AlertDialogSlide open={open} handleClose={handleClose} />
        <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={handleSignOut}>
          Logout
        </Button>
      </Stack>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={currentUser.name}
          src={currentUser.photoURL}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {currentUser.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {currentUser.email}
          </Typography>
        </Box>
        {/* <OptionsMenu /> */}
      </Stack>
    </Drawer>
  );
}
