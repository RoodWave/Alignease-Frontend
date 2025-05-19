import React, { useState, useEffect } from 'react';
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
    Rating,
    Button,
    Chip
} from '@mui/material';
import reviewService from '../services/ReviewService';

const tableHeaderStyle = { bgcolor: '#F3F3F3' };

const statusColors = {
    PENDING: 'default',
    REVIEWED: 'success',
    REJECTED: 'error'
};

const CustomerFeedback = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await reviewService.getAllReviews();
                if (response.status === 'success') {
                    setFeedbackData(response.reviews);
                }
            } catch (err) {
                console.error("Error fetching feedback:", err);
                setError("Failed to fetch feedback. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    const handleReview = async (reviewId) => {
        try {
            const payload = {
                reviewId: reviewId,
                status: "REVIEWED"
            };
            await reviewService.updateReviewStatus(payload);

            setFeedbackData(prevData =>
                prevData.map(item =>
                    item.reviewId === reviewId
                        ? { ...item, reviewStatus: "REVIEWED" }
                        : item
                )
            );
        } catch (err) {
            console.error("Error updating review status:", err);
            setError("Failed to update review status. Please try again.");
        }
    };

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
                {loading && <Typography>Loading feedback...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {!loading && !error && feedbackData.length === 0 && (
                    <Typography>No feedback available</Typography>
                )}

                {!loading && !error && feedbackData.length > 0 && (
                    <TableContainer component={Paper} sx={{
                        maxHeight: 500,
                        border: 1,
                        borderColor: '#C6C6C6',
                        borderRadius: '10px'
                    }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableHeaderStyle}>Title</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Rating</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Feedback</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Status</TableCell>
                                    <TableCell sx={tableHeaderStyle}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feedbackData.map((row, index) => (
                                    <TableRow key={row.reviewId} sx={{ bgcolor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>
                                            <Rating
                                                value={parseFloat(row.rating)}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </TableCell>
                                        <TableCell>{row.content}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.reviewStatus}
                                                color={statusColors[row.reviewStatus] || 'default'}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {row.reviewStatus === 'PENDING' && (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => handleReview(row.reviewId)}
                                                >
                                                    Review
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box>
    );
};

export default CustomerFeedback;