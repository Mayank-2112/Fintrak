import React from 'react'
import CustomizedDataGrid from '../components/CustomizedDataGrid'
import { Box, Button, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CustomDialog } from '../components/CustomDialog';

export const Products = () => {
    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [editProduct, setEditProduct] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditProduct(null);
    };

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
              const res = await fetch(`${import.meta.env.VITE_PORT}/server/product/getall`);
              const data = await res.json();
              if (res.ok) {
                setProducts(data.products);
              }
              
            } catch (error) {
              console.log(error);
              
            }
          };
          fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        setEditProduct(product);
        setOpen(true);
    };
        
    
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    Product Details
                </Typography>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<AddCircleOutlinedIcon />} onClick={handleClickOpen}>
                        New Product
                    </Button>
                    <CustomDialog open={open} handleClose={handleClose} category={'product'} setData={setProducts} editData={editProduct}/>
                </Stack>
            </Box>
            <CustomizedDataGrid category={'product'} open={open} data={products} setData={setProducts} handleEditClick={handleEditClick} />
        </Box>
    )
}
