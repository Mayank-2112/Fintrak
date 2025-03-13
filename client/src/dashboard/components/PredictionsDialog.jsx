import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CombinedChart from './CombinedChart';
import CombinedChartTest from './CombinedChartTest';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function PredictionsDialog({ open, handleClose }) {
    const [show, setShow] = React.useState(false);
    const handleClick =()=>{
        setShow(true);
    };
    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullScreen
                maxWidth="lg"
            >
                <DialogTitle sx={{ m: 0, p: 2, width: '100%' }} id="customized-dialog-title">
                    <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
                        Revenue and Prediction
                    </Typography>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                        Charted Revenue and Predicted Revenue based on a simple linear regression model.
                    </Typography>
                    <CombinedChart show={show} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClick} color='primary' variant='contained'>
                        Show Predictions
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
