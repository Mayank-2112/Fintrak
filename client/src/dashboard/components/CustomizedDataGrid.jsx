import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip } from '@mui/material';
import { productCols, clientCols, purchaseCols, saleCols } from '../internals/data/gridData';
import { CustomDialogAction } from './CustomDialogAction';


export  const CustomizedDataGrid = ({ category, data, setData, handleEditClick }) => {
  const [col, setCols] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [actionType, setActionType] = React.useState(''); // 'Edit' or 'Delete'
  
  React.useEffect(() => {
    if (category === 'product') {
      setCols(productCols(handleDialogOpen));
    }
    else if (category === 'client') {
      setCols(clientCols(handleDialogOpen));
    }
    else if (category === 'purchase') {
      setCols(purchaseCols(handleDialogOpen));
    }
    else if (category === 'sale') {
      setCols(saleCols(handleDialogOpen));
    }
  }, [category]);
  
  const handleDialogOpen = (row, type) => {
    setSelectedRow(row);
    setActionType(type);
    setOpenDialog(true);
  };

  
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    setActionType('');
  };

  
  
  return (
    <>
      <DataGrid
        rows={data}
        columns={col}
        getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20, 50]}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: { variant: 'outlined', size: 'small' },
              columnInputProps: { variant: 'outlined', size: 'small', sx: { m: 3 } },
              operatorInputProps: { variant: 'outlined', size: 'small', sx: { m: 3 } },
              valueInputProps: { InputComponentProps: { variant: 'outlined', size: 'small' } },
            },
          },
        }}
      />

      {/* Custom Dialog for Edit/Delete */}
      <CustomDialogAction 
        open={openDialog} 
        handleClose={handleDialogClose} 
        category={category}
        actionType={actionType} 
        editRow={selectedRow}
        setData={setData}
      />
    </>
  );
}

export default CustomizedDataGrid;