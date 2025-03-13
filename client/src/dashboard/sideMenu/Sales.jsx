import React from 'react'
import CustomizedDataGrid from '../components/CustomizedDataGrid'
import { Box, Button, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CustomDialog } from '../components/CustomDialog';

export const Sales = () => {
    const [open, setOpen] = React.useState(false);
    const [sales, setSales] = React.useState([]);
    const [editSales, setEditSales] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditSales(null);
    };

    React.useEffect(() => {
        const fetchSales = async () => {
            try {
              const res = await fetch(`${import.meta.env.VITE_PORT}/server/sale/getall`);
              const data = await res.json();
              
              if (res.ok) {
                
                setSales(data.sales);
              }
              
            } catch (error) {
              console.log(error);
              
            }
          };
          fetchSales();
    }, []);

    const handleEditClick = (sale) => {
        setEditSales(sale);
        setOpen(true);
    };

    
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    Sales Details
                </Typography>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<AddCircleOutlinedIcon />} onClick={handleClickOpen}>
                        New Sale
                    </Button>
                    <CustomDialog open={open} handleClose={handleClose} category={'sale'} setData={setSales} editData={editSales}/>
                </Stack>
            </Box>
            <CustomizedDataGrid category={'sale'} open={open} data={sales} setData={setSales} handleEditClick={handleEditClick} />
        </Box>
    )
}
