import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CollapsibleTable from '../components/CollapsibleTable';
import { CustomDialog } from '../components/CustomDialog';

export const Departments = () => {
    const [open, setOpen] = React.useState(false);
    const [departments, setDepartments] = React.useState([]);
    const [editDepartment, setEditDepartment] = React.useState(null);
    const [members, setMembers] = React.useState([]);
    const [editMembers, setEditMembers] = React.useState([]);
      

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_PORT}/server/department/getall`);
                const data = await res.json();

                if (res.ok) {
                    setDepartments(data.depts);
                }

            } catch (error) {
                console.log(error);

            }
        };
        const fetchMembers = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_PORT}/server/member/getall`);
                const data = await res.json();
                if (res.ok) {
                    setMembers(data.members);
                }

            } catch (error) {
                console.log(error);

            }
        };

        fetchDepartments();
        fetchMembers();


    }, []);
    
    
    const formattedData = departments.map((dept) => ({
        _id: dept._id,
        deptId: dept.deptId,
        deptName: dept.deptName,
        deptHead: dept.deptHead,
        noOfMembers: members.filter((mem) => mem.deptId === dept.deptId).length,
        members: members
            .filter((mem) => mem.deptId === dept.deptId)
            .map((mem) => ({
                _id: mem._id,
                memId: mem.memId,
                memName: mem.memName,
                memEmail: mem.memEmail,
                memRole: mem.memRole,
            })),
    }));

    const handleEditClick = (dept) => {
        setEditDepartment(dept);
        setOpen(true);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography component="h2" variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    Departments Details
                </Typography>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<AddCircleOutlinedIcon />} onClick={handleClickOpen}>
                        New Department Record
                    </Button>
                    <CustomDialog open={open} handleClose={handleClose} category={'department'} setData={setDepartments} editData={editDepartment} />
                </Stack>
            </Box>
            <CollapsibleTable departmentsData={formattedData} setData={setDepartments} setMembers={setMembers} editData={editMembers}/>
        </Box>
    )
}
