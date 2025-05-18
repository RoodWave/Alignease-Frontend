import React, { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Menu,
    MenuItem
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const issuesData = [
    { name: 'Anandsha De Silva', email: 'kasunthilina@gmail.com', number: '0789999999', service: 'Wheel Balancing', title: 'System failure when selecting date', status: 'Open' },
    { name: 'Fayodi Perera', email: 'fayodi@gmail.com', number: '0771234567', service: 'Wheel Balancing', title: 'App crashes on submit', status: 'Open' },
    { name: 'Mahmood King', email: 'kingmahmood@gmail.com', number: '0756789012', service: 'Wheel Balancing', title: 'Incorrect pricing shown', status: 'Open' },
    { name: 'Kasun De Silva', email: 'kasunthilina@gmail.com', number: '0776543210', service: 'Wheel Balancing', title: 'Cannot book a time slot', status: 'Open' }
];

const tableHeaderStyle = { bgcolor: '#F3F3F3' };
const actionButtonStyle = {
    bgcolor: '#DB002B',
    color: '#fff',
    textTransform: 'none',
    '&:hover': { bgcolor: '#c41a18' },
    display: 'flex',
    alignItems: 'center'
};

const IssueReporting = () => {
    const [anchorEl, setAnchorEl] = useState(Array(issuesData.length).fill(null));

    const handleClick = (event, index) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = event.currentTarget;
        setAnchorEl(newAnchorEl);
    };

    const handleClose = (index) => {
        const newAnchorEl = [...anchorEl];
        newAnchorEl[index] = null;
        setAnchorEl(newAnchorEl);
    };

    const handleAction = (action, row, index) => {
        console.log(`Action ${action} performed on issue: ${row.title}`);
        handleClose(index);
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight="600" mb={3}>
                Issue Reporting
            </Typography>
            <Box
                sx={{
                    bgcolor: '#F3F3F3',
                    p: 4,
                    borderRadius: '20px'
                }}
            >
                <TableContainer component={Paper} sx={{
                    maxHeight: 500,
                    border: 1,
                    borderColor: '#C6C6C6',
                    borderRadius: '10px'
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeaderStyle}>Name</TableCell>
                                <TableCell sx={tableHeaderStyle}>Email</TableCell>
                                <TableCell sx={tableHeaderStyle}>Number</TableCell>
                                <TableCell sx={tableHeaderStyle}>Service</TableCell>
                                <TableCell sx={tableHeaderStyle}>Issue Title</TableCell>
                                <TableCell sx={tableHeaderStyle}>Status</TableCell>
                                <TableCell sx={tableHeaderStyle}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {issuesData.map((row, index) => (
                                <TableRow key={index} sx={{ bgcolor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.number}</TableCell>
                                    <TableCell>{row.service}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={actionButtonStyle}
                                            aria-label={`Actions for ${row.name}`}
                                            onClick={(event) => handleClick(event, index)}
                                            endIcon={<KeyboardArrowDownIcon />}
                                        >
                                            Action
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl[index]}
                                            open={Boolean(anchorEl[index])}
                                            onClose={() => handleClose(index)}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleAction('resolve', row, index)}>Resolve</MenuItem>
                                            <MenuItem onClick={() => handleAction('cancel', row, index)}>Cancel</MenuItem>
                                            <MenuItem onClick={() => handleAction('manage', row, index)}>Manage</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default IssueReporting;