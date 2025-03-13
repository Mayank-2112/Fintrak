import React from 'react'
import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const CustomDialogAction = ({ open, handleClose, category, editRow, actionType, setData }) => {
    const value = category;
        const [formData, setFormData] = React.useState(editRow || {});
        const [error, setError] = React.useState(null);
        
        const handleChange = (e) => {
            const { id, value, name } = e.target;
            setFormData((prev) => ({
                ...prev,
                [id || name]: value, // Handle both text inputs and radio buttons
            }));
        };
        
        React.useEffect(() => {
            if (editRow) {
                setFormData({ ...editRow }); // Spread operator to trigger reactivity
            }
        }, [editRow]);
        
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
                let url, method, body;
        
                if (actionType === 'Delete') {
                    url = `${import.meta.env.VITE_PORT}/server/${category}/delete/${editRow._id}`;
                    method = "DELETE";
                    body = null;
                } else {
                    url = `${import.meta.env.VITE_PORT}/server/${category}/update/${editRow._id}`
                    
                    method = "PUT";
                    body = JSON.stringify(formData);
                }
        
                const res = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body,
                });
        
                const data = await res.json();
                if (res.ok) {
                    setData(prev => {
                        if (actionType === 'Delete') {
                            return prev.filter(p => p._id !== editRow._id);
                        } else {
                            return prev.map(p => (p._id === editRow._id ? data : p));
                        }
                    });
        
                    setError(null);
                    handleClose();
                } else {
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
                
                {(actionType === 'Edit' && value === 'product') && (
                    <>
                        <DialogTitle>{actionType} Details</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {actionType} details carefully. And all fields are required.
                            </DialogContentText>
                            {actionType === 'Edit' && (
                                <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                <TextField autoFocus required margin="dense" id="id" name="productId" label="Product Id" type="number" variant="filled" onChange={handleChange} value={formData.id} />
                                <TextField autoFocus required margin="dense" id="name" name="productName" label="Product Name" type="text" variant="filled" onChange={handleChange} value={formData.name}/>
                                <TextField autoFocus required margin="dense" id="head" name="productHead" label="Product Head" type="text" variant="filled" onChange={handleChange} value={formData.head}/>
                                <TextField autoFocus required margin="dense" id="launchDate" name="launchDate" label="Launch Date" type="date" variant="filled" onChange={handleChange} value={formData.launchDate} />
                                <TextField autoFocus required margin="dense" id="cost" name="productCost" label="Product Cost" type="number" variant="filled" onChange={handleChange}  value={formData.cost}/>
                                <FormLabel id="status">Product Status</FormLabel>
                                <RadioGroup
                                    aria-labelledby="status"
                                    name="status"
                                    row
                                    onChange={handleChange}
                                    value={formData.status}
                                >
                                    <FormControlLabel value="ongoing" control={<Radio />} label="Ongoing" />
                                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                                </RadioGroup>
                            </Stack>
                            )}
                        </DialogContent>
                    </>
                )}
                {(actionType === 'Edit' && value === 'client') && (
                    <>
                        <DialogTitle>{actionType} Details</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {actionType} details carefully. And all fields are required.
                            </DialogContentText>
                            {actionType === 'Edit' && (
                                <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                    <TextField autoFocus required margin="dense" id="id" name="clientId" label="Client Id" type="number" variant="filled" onChange={handleChange} value={formData.id} />
                                    <TextField autoFocus required margin="dense" id="name" name="clientName" label="Client Name" type="text" variant="filled" onChange={handleChange} value={formData.name} />
                                    <TextField autoFocus required margin="dense" id="email" name="clientEmail" label="Client Email" type="email" variant="filled" onChange={handleChange} value={formData.email} />
                                    <FormLabel id="status">Client Status</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="status"
                                        name="status"
                                        row
                                        onChange={handleChange}
                                        value={formData.status}
                                    >
                                        <FormControlLabel value="active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                                    </RadioGroup>
                                </Stack>
                            )}
                        </DialogContent>
                    </>
                )}
                {(actionType === 'Edit' && value === 'purchase') && (
                    <>
                    <DialogTitle>{value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {value} details carefully. And all fields are required.
                        </DialogContentText>
                        {value === 'purchase' && (
                            <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                <TextField autoFocus required margin="dense" id="id" name="purchaseId" label="Purchase Id" type="number" variant="filled" onChange={handleChange} value={formData.id} />
                                <TextField autoFocus required margin="dense" id="purchaseItem" name="purchaseItem" label="Purchase Item" type="text" variant="filled" onChange={handleChange} value={formData.purchaseItem} />
                                <TextField autoFocus required margin="dense" id="vendorName" name="vendorName" label="Vendor Name" type="text" variant="filled" onChange={handleChange} value={formData.vendorName} />
                                <TextField autoFocus required margin="dense" id="purchaseDate" name="purchaseDate" label="Purchase Date" type="date" variant="filled" onChange={handleChange} value={formData.purchaseDate} />
                                <TextField autoFocus required margin="dense" id="amount" name="amount" label="Amount" type="number" variant="filled" onChange={handleChange} value={formData.amount} />
                                <TextField autoFocus required margin="dense" id="category" name="category" label="Category" type="text" variant="filled" onChange={handleChange} value={formData.category} />
                            </Stack>
                        )}
                    </DialogContent>
                </>
                )}
                {(actionType === 'Edit' && value === 'sale') && (
                    <>
                    <DialogTitle>{value} Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {value} details carefully. And all fields are required.
                        </DialogContentText>
                        {value === 'sale' && (
                            <Stack sx={{ width: '100%', mt: 3 }} spacing={2}>
                                <TextField autoFocus required margin="dense" id="id" name="purchaseId" label="Sale Id" type="number" variant="filled" onChange={handleChange} value={formData.id} />
                                <TextField autoFocus required margin="dense" id="productName" name="productName" label="Product Name" type="text" variant="filled" onChange={handleChange} value={formData.productName} />
                                <TextField autoFocus required margin="dense" id="clientName" name="clientName" label="Client Name" type="text" variant="filled" onChange={handleChange} value={formData.clientName} />
                                <TextField autoFocus required margin="dense" id="saleDate" name="saleDate" label="Sale Date" type="date" variant="filled" onChange={handleChange} value={formData.saleDate} />
                                <TextField autoFocus required margin="dense" id="amount" name="amount" label="Amount" type="number" variant="filled" onChange={handleChange} value={formData.amount} />
                            </Stack>
                        )}
                    </DialogContent>
                </>
                )}
                {actionType === 'Delete' && (
                    <>
                        <DialogTitle>{value} Details</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this {value} details?
                            </DialogContentText>
                        </DialogContent>
                    </>
                )}
                
    
                <DialogActions>
                    <Button onClick={handleClose} color={actionType === 'Delete' ? 'primary' : 'error' } variant='contained'>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit} variant='contained' color={actionType === 'Delete' ? 'error' : 'primary'}>{actionType === 'Delete' ? 'Delete' : 'Submit'}</Button>
                </DialogActions>
            </Dialog>
        )
    
};