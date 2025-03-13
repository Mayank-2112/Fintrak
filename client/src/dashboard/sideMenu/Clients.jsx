import React from 'react'
import CustomizedDataGrid from '../components/CustomizedDataGrid'
import { Box, Button, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CustomDialog } from '../components/CustomDialog';

export const Clients = () => {
    const [open, setOpen] = React.useState(false);
    const [clients, setClients] = React.useState([]);
    const [editClient, setEditClient] = React.useState(null);

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
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    Client Details
                </Typography>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<AddCircleOutlinedIcon />} onClick={handleClickOpen}>
                        New Client
                    </Button>
                    <CustomDialog open={open} handleClose={handleClose} category={'client'} setData={setClients} editData={editClient} />
                </Stack>
            </Box>
            <CustomizedDataGrid category={'client'} open={open} data={clients} setData={setClients} handleEditClick={handleEditClick} />
        </Box>
    )
}
