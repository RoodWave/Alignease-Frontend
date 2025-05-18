import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Stack
} from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ActivityImage1 from '../assets/myActivity/activity1.png';
import ActivityImage2 from '../assets/myActivity/activity2.png';
import authService from '../services/AuthServices';
import userService from '../services/UserService';

const MyActivity = () => {
    const [activities, setActivities] = useState([]);
    const userId = localStorage.getItem("userId");

    const getActivities = async () => {
        try {
            const products = await userService.productHistory({
                userId,
                bookingStatus: "PENDING"
            });

            const services = await userService.servicesHistory({
                userId,
                bookingStatus: "PENDING"
            });

            const productEntries = products.productBookings.map((pb) => {
                const dateObj = new Date(pb.bookingDate);
                return {
                    id: `product-${pb.productBookingId}`,
                    title: 'Product Booking',
                    description: pb.review || 'Pending product booking',
                    price: 33.00, // Replace with real value if needed
                    date: dateObj.toLocaleDateString(),
                    time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    image: ActivityImage1
                };
            });

            const serviceEntries = services.serviceBookings.map((sb) => {
                const dateObj = new Date(sb.bookingDate);
                return {
                    id: `service-${sb.serviceBookingId}`,
                    title: 'Service Booking',
                    description: sb.review || 'Pending service booking',
                    price: 45.00, // Replace with real value if needed
                    date: dateObj.toLocaleDateString(),
                    time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    image: ActivityImage2
                };
            });

            const allBookings = [...productEntries, ...serviceEntries];
            setActivities(allBookings);
        } catch (error) {
            console.error('Failed to load activities:', error);
        }
    };

    useEffect(() => {
        getActivities();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                My Activity
            </Typography>

            <Grid container spacing={2}>
                {activities.map((activity) => (
                    <Grid item xs={12} md={6} key={activity.id}>
                        <Card
                            elevation={0}
                            sx={{
                                display: 'flex',
                                borderRadius: '10px',
                                bgcolor: '#F3F3F3',
                                color: 'black',
                                p: 1,
                                alignItems: 'center',
                                maxHeight: '125px'
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 'auto',
                                    height: '100%',
                                    maxHeight: '115px',
                                    borderRadius: 1,
                                    objectFit: 'cover'
                                }}
                                image={activity.image}
                                alt={activity.title}
                            />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, mb: 1 }}>
                                            {activity.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: '0.85rem', mb: 1, color: '#757575' }}>
                                            {activity.description}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap:3 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                LKR {activity.price.toFixed(2)}
                                            </Typography>
                                            <Box display="flex" gap={2} alignItems="center">
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <CalendarTodayOutlinedIcon sx={{ fontSize: '1rem', color: '#757575' }} />
                                                    <Typography variant="body2" sx={{ color: '#757575' }}>
                                                        {activity.date}
                                                    </Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <AccessTimeOutlinedIcon sx={{ fontSize: '1rem', color: '#757575' }} />
                                                    <Typography variant="body2" sx={{ color: '#757575' }}>
                                                        {activity.time}
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyActivity;
