import React from 'react'
import CustomizedDataGrid from '../components/CustomizedDataGrid'
import { Box, Button, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CustomDialog } from '../components/CustomDialog';

export const Purchases = () => {
    const [open, setOpen] = React.useState(false);
    const [purchases, setPurchases] = React.useState([]);
    const [editPurchase, setEditPurchase] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditPurchase(null);
    };

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
    }, []);

    const handleEditClick = (purchase) => {
        setEditPurchase(purchase);
        setOpen(true);
    };

        
    
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    Purchase Details
                </Typography>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<AddCircleOutlinedIcon />} onClick={handleClickOpen}>
                        New Purchase
                    </Button>
                    <CustomDialog open={open} handleClose={handleClose} category={'purchase'} setData={setPurchases} editData={editPurchase}/>
                </Stack>
            </Box>
            <CustomizedDataGrid category={'purchase'} open={open} data={purchases} setData={setPurchases} handleEditClick={handleEditClick} />
        </Box>
    )
}
