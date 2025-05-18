import React from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Divider
} from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ActivityImage1 from '../assets/myActivity/activity1.png'
import ActivityImage2 from '../assets/myActivity/activity2.png'
import ActivityImage3 from '../assets/myActivity/activity3.png'
import ActivityImage4 from '../assets/myActivity/activity4.png'

const MyActivity = () => {
    // Sample activity data
    const activities = [
        {
            id: 1,
            title: '175/50R15 EP500 (JAPAN) wheel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Please call now me',
            price: 33.00,
            date: '2023/12/12',
            time: '10:30 AM',
            image: ActivityImage1
        },
        {
            id: 2,
            title: '175/50R15 EP500 (JAPAN) wheel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Please call now me',
            price: 33.00,
            date: '2023/12/12',
            time: '10:30 AM',
            image: ActivityImage1
        },
        {
            id: 3,
            title: 'Lorem ipsum lorem ipsum',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Please call now me',
            price: 30.00,
            date: '2023/12/10',
            time: '11:45 AM',
            image: ActivityImage2
        },
        {
            id: 4,
            title: 'Lorem ipsum lorem ipsum',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Please call now me',
            price: 30.00,
            date: '2023/12/09',
            time: '09:30 AM',
            image: ActivityImage3
        },
        {
            id: 5,
            title: 'Lorem ipsum lorem ipsum',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Please call now me',
            price: 35.00,
            date: '2023/12/08',
            time: '02:15 PM',
            image: ActivityImage4
        }
    ];

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
                                alignItems:'center',
                                maxHeight:'125px'
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 'auto',
                                    height: '100%',
                                    maxHeight:'115px',
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
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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