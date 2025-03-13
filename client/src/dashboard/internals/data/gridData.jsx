import * as React from 'react';
import Chip from '@mui/material/Chip';

import { Button } from '@mui/material';
import { CustomDialog } from '../../components/CustomDialog';


function renderButtonCell(params) {
  const { value, colDef } = params;
   const [open, setOpen] = React.useState(false);
  
      const handleClickOpen = () => {
          setOpen(true);
      };
  
      const handleClose = () => {
          setOpen(false);
      };

      const handleEditClick = (product) => {
        setEditProduct(product);
        setOpen(true);
    };
    
  return (
    <>
      <Button variant='contained' color={colDef.headerName === 'Edit' ? 'success' : 'error'} onClick={handleClickOpen}>
        {colDef.headerName === 'Delete' ? 'Delete' : 'Edit'}
      </Button>
      <CustomDialog open={open} handleClose={handleClose} category={colDef.headerName === 'Delete' ? 'Delete' : 'Edit'} />
    </>
    
  );
}


export const renderStatus = (status, category) => {
  const colors = category === 'client' 
    ? { active: 'success', inactive: 'error' } 
    : { completed: 'success', ongoing: 'default' };

  return <Chip label={status} color={colors[status] || 'default'} />;
};


export const productCols = (handleDialogOpen)=>[
    { field: 'id', headerName: 'Product ID', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'status', headerName: 'Product Status', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80, renderCell: (params) => renderStatus(params.value,'product') },
    { field: 'name', headerName: 'Product Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80 },
    { field: 'head', headerName: 'Product Head', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
    { field: 'launchDate', headerName: 'Launch Date', headerAlign: 'center', align: 'center', flex: 1, minWidth: 120, renderCell: (params) => new Date(params.value).toLocaleDateString() },
    { field: 'cost', headerName: 'Product Cost', headerAlign: 'center', align: 'center', flex: 1, minWidth: 120 },
    { 
      field: 'edit', headerName: 'Edit', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100, 
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="success" 
          onClick={() => handleDialogOpen(params.row, 'Edit')}
        >
          Edit
        </Button>
      )
    },
    { 
      field: 'delete', headerName: 'Delete', headerAlign: 'center', align: 'center', flex: 1, minWidth: 150,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => handleDialogOpen(params.row, 'Delete')}
        >
          Delete
        </Button>
      )
    }
  ];
  export const clientCols = (handleDialogOpen)=>[
    { field: 'id', headerName: 'Client ID', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Client Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80 },
    { field: 'email', headerName: 'Client Email', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80 },
    { field: 'status', headerName: 'Client Status', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80, renderCell: (params) => renderStatus(params.value, 'client') },
    { 
      field: 'edit', headerName: 'Edit', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80, 
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="success" 
          onClick={() => handleDialogOpen(params.row, 'Edit')}
        >
          Edit
        </Button>
      )
    },
    { 
      field: 'delete', headerName: 'Delete', headerAlign: 'center', align: 'center', flex: 1, minWidth: 150,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => handleDialogOpen(params.row, 'Delete')}
        >
          Delete
        </Button>
      )
    }
  ];

  export const purchaseCols = (handleDialogOpen) => [
    { field: 'id', headerName: 'Purchase ID', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
    { field: 'purchaseItem', headerName: 'Purchase Item', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
    { field: 'vendorName', headerName: 'Vendor Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
    { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
    { field: 'purchaseDate', headerName: 'Purchase Date', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100,
      renderCell: (params) => new Date(params.value).toLocaleDateString()
    },
    { field: 'category', headerName: 'Category', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100,  renderCell: (params) => renderStatus(params.value, 'purchase') },
    { 
      field: 'edit', headerName: 'Edit', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80, 
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="success" 
          onClick={() => handleDialogOpen(params.row, 'Edit')}
        >
          Edit
        </Button>
      )
    },
    { 
      field: 'delete', headerName: 'Delete', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100,
      renderCell: (params) => (
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => handleDialogOpen(params.row, 'Delete')}
        >
          Delete
        </Button>
      )
    }
];

export const saleCols = (handleDialogOpen) => [
  { field: 'id', headerName: 'Sale ID', flex: 1, minWidth: 80, headerAlign: 'center', align: 'center' },
  { field: 'productName', headerName: 'Product Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
  { field: 'clientName', headerName: 'Client Name', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
  { field: 'amount', headerName: 'Amount', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100 },
  { field: 'saleDate', headerName: 'Sale Date', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100,
    renderCell: (params) => new Date(params.value).toLocaleDateString()
  },
  { 
    field: 'edit', headerName: 'Edit', headerAlign: 'center', align: 'center', flex: 1, minWidth: 80, 
    renderCell: (params) => (
      <Button 
        variant="contained" 
        color="success" 
        onClick={() => handleDialogOpen(params.row, 'Edit')}
      >
        Edit
      </Button>
    )
  },
  { 
    field: 'delete', headerName: 'Delete', headerAlign: 'center', align: 'center', flex: 1, minWidth: 100,
    renderCell: (params) => (
      <Button 
        variant="contained" 
        color="error" 
        onClick={() => handleDialogOpen(params.row, 'Delete')}
      >
        Delete
      </Button>
    )
  }
];

