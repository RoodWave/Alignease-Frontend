import React from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Rating
} from '@mui/material';

const feedbackData = [
    { name: 'Essen Peters', rating: 4, feedback: 'Great service, very quick and friendly!' },
    { name: 'Anandsha De Silva', rating: 5, feedback: 'Excellent experience from start to finish.' },
    { name: 'Hansi Isankya Rajapaksha', rating: 3, feedback: 'Service was okay, could be better.' },
    { name: 'Anandsha De Silva', rating: 4, feedback: 'Appreciate the professionalism shown.' },
    { name: 'Anandsha De Silva', rating: 2, feedback: 'Not happy with the delay in service.' },
    { name: 'Anandsha De Silva', rating: 5, feedback: 'Very happy with the results!' }
];

const tableHeaderStyle = { bgcolor: '#F3F3F3' };

const CustomerFeedback = () => {
    return (
        <Box>
            <Typography variant="h5" fontWeight="600" mb={3}>
                Customer Feedback
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
                                <TableCell sx={tableHeaderStyle}>Star Rating</TableCell>
                                <TableCell sx={tableHeaderStyle}>Feedback</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedbackData.map((row, index) => (
                                <TableRow key={index} sx={{ bgcolor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        <Rating value={row.rating} readOnly />
                                    </TableCell>
                                    <TableCell>{row.feedback}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default CustomerFeedback;
