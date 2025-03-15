import React from 'react'
import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const CustomDialog = ({ open, handleClose, category, setData, editData }) => {
    const value = category;
    const [formData, setFormData] = React.useState({});
    const [error, setError] = React.useState(null);

    const handleChange = (e) => {
        const { id, value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id || name]: value, // Handle both text inputs and radio buttons
        }));
    };
    React.useEffect(() => {
        if (editData) {
            setFormData(editData);
        }
    }, [editData]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_PORT}/server/${category}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setData((prev) => [...prev, data]);
                setError(null);
                handleClose();
            }
            else {
                setError(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{ width: '3/5' }}
        >
            {value === 'product' && (
                <>
                    <DialogTitle>New {value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new {value} details carefully. And all fields are required.
                        </DialogContentText>
                            <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                <TextField autoFocus required margin="dense" id="id" name="productId" label="Product Id" type="number" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="name" name="productName" label="Product Name" type="text" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="head" name="productHead" label="Product Head" type="text" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="launchDate" name="launchDate" label="Launch Date" type="date" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="cost" name="productCost" label="Product Cost" type="number" variant="filled" onChange={handleChange} />
                                <FormLabel id="status">Product Status</FormLabel>
                                <RadioGroup
                                    aria-labelledby="status"
                                    name="status"
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="ongoing" control={<Radio />} label="Ongoing" />
                                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                                </RadioGroup>
                            </Stack>
                    </DialogContent>
                </>
            )}
            {value === 'client' && (
                <>
                    <DialogTitle>New {value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new {value} details carefully. And all fields are required.
                        </DialogContentText>
                            <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                <TextField autoFocus required margin="dense" id="id" name="clientId" label="Client Id" type="number" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="name" name="clientName" label="Client Name" type="text" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="email" name="clientEmail" label="Client Email" type="email" variant="filled" onChange={handleChange} />
                                <FormLabel id="status">Client Status</FormLabel>
                                <RadioGroup
                                    aria-labelledby="status"
                                    name="status"
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                </RadioGroup>
                            </Stack>
                    </DialogContent>
                </>
            )}
            {value === 'purchase' && (
                <>
                    <DialogTitle>New {value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new {value} details carefully. And all fields are required.
                        </DialogContentText>
                            <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                <TextField autoFocus required margin="dense" id="id" name="purchaseId" label="Purchase Id" type="number" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="purchaseItem" name="purchaseItem" label="Purchase Item" type="text" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="vendorName" name="vendorName" label="Vendor Name" type="text" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="purchaseDate" name="purchaseDate" label="Purchase Date" type="date" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="amount" name="amount" label="Amount" type="number" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="category" name="category" label="Category" type="text" variant="filled" onChange={handleChange} />
                            </Stack>
                    </DialogContent>
                </>
            )}
            {value === 'sale' && (
                <>
                    <DialogTitle>New {value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new {value} details carefully. And all fields are required.
                        </DialogContentText>
                            <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                <TextField autoFocus required margin="dense" id="id" name="purchaseId" label="Sale Id" type="number" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="productName" name="productName" label="Product Name" type="text" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="clientName" name="clientName" label="Client Name" type="text" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="saleDate" name="saleDate" label="Sale Date" type="date" variant="filled" onChange={handleChange} />
                                <TextField autoFocus required margin="dense" id="amount" name="amount" label="Amount" type="number" variant="filled" onChange={handleChange} />
                            </Stack>
                    </DialogContent>
                </>
            )}
            {value === 'department' && (
                <>
                    <DialogTitle>New {value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Add new {value} details carefully. And all fields are required.</DialogContentText>
                        <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                            <TextField autoFocus required margin="dense" id="deptId" name="deptId" label="Department ID" type="text" variant="filled" onChange={handleChange} />
                            <TextField autoFocus required margin="dense" id="deptName" name="deptName" label="Department Name" type="text" variant="filled" onChange={handleChange} />
                            <TextField autoFocus required margin="dense" id="deptHead" name="deptHead" label="Department Head" type="text" variant="filled" onChange={handleChange} />
                        </Stack>
                    </DialogContent>
                </>
            )}

            {value === 'member' && (
                <>
                    <DialogTitle>New {value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Add new {value} details carefully. And all fields are required.</DialogContentText>
                        <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                            <TextField autoFocus required margin="dense" id="memId" name="memId" label="Member ID" type="number" variant="filled" onChange={handleChange} />
                            <TextField required margin="dense" id="memName" name="memName" label="Member Name" type="text" variant="filled" onChange={handleChange} />
                            <TextField required margin="dense" id="memEmail" name="memEmail" label="Member Email" type="email" variant="filled" onChange={handleChange} />
                            <TextField required margin="dense" id="memRole" name="memRole" label="Member Role" type="text" variant="filled" onChange={handleChange} />
                            <TextField required margin="dense" id="deptId" name="deptId" label="Department Id" type="text" variant="filled" onChange={handleChange} />
                        </Stack>
                    </DialogContent>
                </>
            )}


            <DialogActions>
                <Button onClick={handleClose} color='error' variant='contained'>Cancel</Button>
                <Button type="submit" onClick={handleSubmit} variant='contained' color='primary'>Create</Button>
            </DialogActions>
        </Dialog>
    )
}
