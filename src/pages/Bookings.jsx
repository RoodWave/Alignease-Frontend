import React from 'react';
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
    Typography
} from '@mui/material';

const bookingsData = [
    { id: 1, item: 'Wheel Balancing', date: '2023/10/20', time: '10:30 AM', price: 'USD 30,000' },
    { id: 2, item: 'Nitrogen Filling', date: '2023/10/20', time: '10:30 AM', price: 'USD 35,000' },
    { id: 3, item: 'Wheel Balancing', date: '2023/10/20', time: '10:30 AM', price: 'USD 30,000' },
    { id: 4, item: 'Wheel Alignment', date: '2023/10/20', time: '10:30 AM', price: 'USD 25,000' },
    { id: 5, item: 'Car Polishing', date: '2023/10/20', time: '10:30 AM', price: 'USD 40,000' },
    { id: 6, item: 'Tire Patching', date: '2023/10/20', time: '10:30 AM', price: 'USD 10,000' },
    { id: 7, item: 'Wheel Alignment', date: '2023/10/20', time: '10:30 AM', price: 'USD 25,000' },
    { id: 8, item: 'Nitrogen Filling', date: '2023/10/20', time: '10:30 AM', price: 'USD 35,000' },
    { id: 9, item: 'Wheel Balancing', date: '2023/10/20', time: '10:30 AM', price: 'USD 30,000' }
];

const tableHeaderStyle = { bgcolor: '#F3F3F3' };
const acceptButtonStyle = {
    mr: 1,
    bgcolor: '#009A27',
    color: '#fff',
    textTransform: 'none',
    '&:hover': { bgcolor: '#388e3c' }
};
const rejectButtonStyle = {
    bgcolor: '#DB002B',
    color: '#fff',
    textTransform: 'none',
    '&:hover': { bgcolor: '#c41a18' }
};

const Bookings = () => {
    return (
        <Box>
            <Typography variant="h5" fontWeight="600" mb={3}>
                Bookings
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
                                <TableCell sx={tableHeaderStyle}>Item</TableCell>
                                <TableCell sx={tableHeaderStyle}>Date</TableCell>
                                <TableCell sx={tableHeaderStyle}>Time</TableCell>
                                <TableCell sx={tableHeaderStyle}>Price</TableCell>
                                <TableCell sx={tableHeaderStyle}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingsData.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        bgcolor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF'
                                    }}
                                >
                                    <TableCell  sx={tableHeaderStyle}>{row.item}</TableCell>
                                    <TableCell  sx={tableHeaderStyle}>{row.date}</TableCell>
                                    <TableCell  sx={tableHeaderStyle}>{row.time}</TableCell>
                                    <TableCell  sx={tableHeaderStyle}>{row.price}</TableCell>
                                    <TableCell  sx={tableHeaderStyle}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={acceptButtonStyle}
                                            aria-label={`Accept booking for ${row.item}`}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={rejectButtonStyle}
                                            aria-label={`Reject booking for ${row.item}`}
                                        >
                                            Reject
                                        </Button>
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

export default Bookings;
