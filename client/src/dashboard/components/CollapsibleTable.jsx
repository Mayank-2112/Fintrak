import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Stack } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CustomDialog } from './CustomDialog';




function DepartmentRow({ department, setData, editData }) {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [members, setMembers] = React.useState([]);
  const [editMember, setEditMember] = React.useState(null);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableRow style={{ backgroundColor: "black" }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='center'>{department.deptId}</TableCell>
        <TableCell align='center'>{department.deptName}</TableCell>
        <TableCell align='center'>{department.deptHead}</TableCell>
        <TableCell align="center">{department.noOfMembers}</TableCell>
        <TableCell align="center">
          <Button color={'success'} variant='contained'>Edit</Button>
        </TableCell>
        <TableCell align='center'>
          <Button type="submit" variant='contained' color='error'>Delete</Button>
        </TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: 'black' }}>
        <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <Typography variant="h6" gutterBottom>
                  Team Members
                </Typography>
                <Stack sx={{ p: 2 }}>
                  <Button variant="outlined" fullWidth startIcon={<AddCircleOutlinedIcon />} onClick={handleClickOpen}>
                    New Member Record
                  </Button>
                  <CustomDialog open={openDialog} handleClose={handleClose} category={'member'} setData={setData} editData={editData} />
                </Stack>
              </Box>

              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Member ID</TableCell>
                    <TableCell align='center'>Name</TableCell>
                    <TableCell align='center'>Email</TableCell>
                    <TableCell align='center'>Role</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {department.members.map((member) => (
                    <TableRow key={member.memId}>
                      <TableCell align='center'>{member.memId}</TableCell>
                      <TableCell align='center'>{member.memName}</TableCell>
                      <TableCell align='center'>{member.memEmail}</TableCell>
                      <TableCell align='center'>{member.memRole}</TableCell>
                      <TableCell align="center">
                        <Button color={'success'} variant='contained'>Edit</Button>
                      </TableCell>
                      <TableCell align='center'>
                        <Button type="submit" variant='contained' color='error'>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

DepartmentRow.propTypes = {
  department: PropTypes.shape({
    deptId: PropTypes.string.isRequired,
    deptName: PropTypes.string.isRequired,
    deptHead: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        memId: PropTypes.string.isRequired,
        memName: PropTypes.string.isRequired,
        memEmail: PropTypes.string.isRequired,
        memRole: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};





export default function CollapsibleTable({ departmentsData, setData, editData }) {

  return (

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align='center'>Department ID</TableCell>
            <TableCell align='center'>Department Name</TableCell>
            <TableCell align='center'>Department Head</TableCell>
            <TableCell align="center">No. of Members</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departmentsData.map((dept) => (
            <DepartmentRow key={dept.deptId} department={dept} setData={setData} editData={editData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
