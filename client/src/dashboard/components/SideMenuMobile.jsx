import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../../redux/userSlice';
import AlertDialogSlide from './AlertDialogSlide';
import PersonIcon from '@mui/icons-material/Person';

function SideMenuMobile({ open, toggleDrawer }) {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async ()=>{
    try {
      const res = await fetch(`${import.meta.env.VITE_PORT}/server/auth/signout`,{
        method: 'POST'
      });
      const data = await res.json();
      if(res.ok){
        dispatch(signOutSuccess());
      }
      else{
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [openDialog, setOpenDialog] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpenDialog(true);
    };
  
    const handleClose = () => {
      setOpenDialog(false);
    };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={currentUser.name}
              src={currentUser.photoURL}
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {currentUser.name}
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2, gap: 2 }}>
        <Button variant="outlined" fullWidth startIcon={<PersonIcon />} onClick={handleClickOpen}>
          Profile
        </Button>
        <AlertDialogSlide open={openDialog} handleClose={handleClose} />
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />} onClick={handleSignOut}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
