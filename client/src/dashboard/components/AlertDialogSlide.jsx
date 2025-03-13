import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Stack, TextField } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import {updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, deleteUserStart, signOutSuccess} from '../../redux/userSlice.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, handleClose }) {
    const {currentUser} = useSelector((state) => state.user);
    if (!currentUser?._id) {
      dispatch(updateUserFailure("User ID is missing"));
      return;
  }
  
    const [formData, setFormData] = React.useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        password: "",
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    
    const handleSubmit = async (e)=>{
      e.preventDefault();
      const updatedData = { 
        name: formData.name, 
        email: formData.email 
    };

    if (formData.password) {
        updatedData.password = formData.password;
    }
      try {
        dispatch(updateUserStart());
        const res = await fetch(`${import.meta.env.VITE_PORT}/server/user/update/${currentUser._id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        const data = await res.json();
        if(res.ok){
          dispatch(updateUserSuccess(data));
          handleClose();
        }
        else{
          dispatch(updateUserFailure(data.message));
        }
      } catch (error) {
        dispatch(updateUserFailure(error.message));
      }
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"User Profile"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Check data carefully before updating.
                    </DialogContentText>
                        <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                            <TextField autoFocus required margin="dense" id="name" name="Name" label="Full Name" type="text" variant="filled" onChange={handleChange} value={formData.name} />
                            <TextField autoFocus required margin="dense" id="email" name="Email" label="Email" type="email" variant="filled" onChange={handleChange} value={formData.email} />
                            <TextField autoFocus required margin="dense" id="password" name="Password" label="Password" type="password" variant="filled" onChange={handleChange} value={formData.password} />
                            
                        </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='primary'>Cancel</Button>
                    <Button onClick={handleSubmit} variant='contained' color='success'>Update</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
