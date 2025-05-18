import React, { useState, useEffect } from 'react';
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
    Tabs,
    Tab,
    Chip
} from '@mui/material';
import adminServices from "../services/AdminServices.js";

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

const statusColors = {
    PENDING: 'default',
    CONFIRMED: 'success',
    REJECTED: 'error',
    CANCELLED: 'warning',
    COMPLETED: 'primary'
};

const Bookings = () => {
    const [tabValue, setTabValue] = useState(0);
    const [serviceBookings, setServiceBookings] = useState([]);
    const [productBookings, setProductBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                if (tabValue === 0) {
                    const response = await adminServices.getAllServiceBookings();
                    if (response.status === 'success') {
                        const formattedData = response.serviceBookingsWithDetails.map(item => ({
                            id: item.serviceBooking.serviceBookingId,
                            item: item.service.name,
                            date: new Date(item.serviceBooking.bookingDate).toLocaleDateString(),
                            time: new Date(item.serviceBooking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            price: `LKR ${item.service.cost}`,
                            status: item.serviceBooking.bookingStatus,
                            rawData: item
                        }));
                        setServiceBookings(formattedData);
                    }
                } else {
                    const response = await adminServices.getAllProductBookings();
                    if (response.status === 'success') {
                        const formattedData = response.productBookingsWithDetails.map(item => ({
                            id: item.productBooking.productBookingId,
                            item: item.product.name,
                            date: new Date(item.productBooking.bookingDate).toLocaleDateString(),
                            time: new Date(item.productBooking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            price: `LKR ${item.product.price}`,
                            quantity: item.productBooking.quantity,
                            status: item.productBooking.bookingStatus,
                            rawData: item
                        }));
                        setProductBookings(formattedData);
                    }
                }
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("Failed to fetch bookings. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tabValue]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAccept = async (booking) => {
        try {
            if (tabValue === 0) {
                await adminServices.approveServiceBooking(booking.rawData.serviceBooking.serviceBookingId);
            } else {
                await adminServices.approveProductBooking(booking.rawData.productBooking.productBookingId);
            }

            const response = tabValue === 0
                ? await adminServices.getAllServiceBookings()
                : await adminServices.getAllProductBookings();

            if (response.status === 'success') {
                const formattedData = tabValue === 0
                    ? response.serviceBookingsWithDetails.map(item => ({
                        id: item.serviceBooking.serviceBookingId,
                        item: item.service.name,
                        date: new Date(item.serviceBooking.bookingDate).toLocaleDateString(),
                        time: new Date(item.serviceBooking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        price: `USD ${item.service.cost}`,
                        status: item.serviceBooking.bookingStatus,
                        rawData: item
                    }))
                    : response.productBookingsWithDetails.map(item => ({
                        id: item.productBooking.productBookingId,
                        item: item.product.name,
                        date: new Date(item.productBooking.bookingDate).toLocaleDateString(),
                        time: new Date(item.productBooking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        price: `USD ${item.product.price}`,
                        quantity: item.productBooking.quantity,
                        status: item.productBooking.bookingStatus,
                        rawData: item
                    }));

                tabValue === 0 ? setServiceBookings(formattedData) : setProductBookings(formattedData);
            }
        } catch (err) {
            console.error("Error processing action:", err);
            setError("Failed to process action. Please try again.");
        }
    };

    const handleReject = async (booking) => {
        try {
            if (tabValue === 0) {
                await adminServices.rejectServiceBooking(booking.rawData.serviceBooking.serviceBookingId);
            } else {
                await adminServices.rejectProductBooking(booking.rawData.productBooking.productBookingId);
            }

            const response = tabValue === 0
                ? await adminServices.getAllServiceBookings()
                : await adminServices.getAllProductBookings();

            if (response.status === 'success') {
                const formattedData = tabValue === 0
                    ? response.serviceBookingsWithDetails.map(item => ({
                        id: item.serviceBooking.serviceBookingId,
                        item: item.service.name,
                        date: new Date(item.serviceBooking.bookingDate).toLocaleDateString(),
                        time: new Date(item.serviceBooking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        price: `USD ${item.service.cost}`,
                        status: item.serviceBooking.bookingStatus,
                        rawData: item
                    }))
                    : response.productBookingsWithDetails.map(item => ({
                        id: item.productBooking.productBookingId,
                        item: item.product.name,
                        date: new Date(item.productBooking.bookingDate).toLocaleDateString(),
                        time: new Date(item.productBooking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        price: `USD ${item.product.price}`,
                        quantity: item.productBooking.quantity,
                        status: item.productBooking.bookingStatus,
                        rawData: item
                    }));

                tabValue === 0 ? setServiceBookings(formattedData) : setProductBookings(formattedData);
            }
        } catch (err) {
            console.error("Error processing action:", err);
            setError("Failed to process action. Please try again.");
        }
    };

    const renderTable = (data) => {
        if (loading) return <Typography>Loading...</Typography>;
        if (error) return <Typography color="error">{error}</Typography>;
        if (data.length === 0) return <Typography>No bookings found</Typography>;

        return (
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
                            {tabValue === 1 && <TableCell sx={tableHeaderStyle}>Quantity</TableCell>}
                            <TableCell sx={tableHeaderStyle}>Price</TableCell>
                            <TableCell sx={tableHeaderStyle}>Status</TableCell>
                            <TableCell sx={tableHeaderStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    bgcolor: index % 2 === 0 ? '#FAFAFA' : '#FFFFFF'
                                }}
                            >
                                <TableCell>{row.item}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.time}</TableCell>
                                {tabValue === 1 && <TableCell>{row.quantity}</TableCell>}
                                <TableCell>{row.price}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        color={statusColors[row.status] || 'default'}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    {row.status === 'PENDING' ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={acceptButtonStyle}
                                                aria-label={`Accept booking for ${row.item}`}
                                                onClick={() => handleAccept(row)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={rejectButtonStyle}
                                                aria-label={`Reject booking for ${row.item}`}
                                                onClick={() => handleReject(row)}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            Action completed
                                        </Typography>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Box>
            <Typography variant="h5" fontWeight="600" mb={3}>
                Bookings
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Service Bookings" />
                    <Tab label="Product Bookings" />
                </Tabs>
            </Box>

            <Box
                sx={{
                    bgcolor: '#F3F3F3',
                    p: 4,
                    borderRadius: '20px',
                    mt: 2
                }}
            >
                {renderTable(tabValue === 0 ? serviceBookings : productBookings)}
            </Box>
        </Box>
    );
};

export default Bookings;