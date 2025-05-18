import React from 'react';
import {
    Container, Box, Typography, Grid, TextField, Button, useMediaQuery
} from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BookingCard = ({
    image,
    title,
    description,
    amount,
    estimatedTime,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    btnClick
}) => {
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
        <Container maxWidth="lg" sx={{ mb: 4, display: 'flex', justifyContent:'center',alignItems:'center', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
            <Box
                component='img'
                src={image}
                sx={{ height: "auto", width: '100%', maxWidth: '470px' }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', width: isMobile ? '100%' : '60%' }}>
                <Box sx={{ flex: '1 0 auto', p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{ mb: 2, whiteSpace: 'pre-line' }}
                    >
                        {description}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ mb: 2 }} color='#757575'>
                        Book your Time slot now
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Select your Date"
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            size="small"
                                            sx={{ '& .MuiInputBase-root': { height: 40 } }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TimePicker
                                    label="Select your Time"
                                    value={selectedTime}
                                    onChange={setSelectedTime}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            size="small"
                                            sx={{ '& .MuiInputBase-root': { height: 30 } }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </LocalizationProvider>

                    <Box sx={{ mt: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Typography variant="h6" fontWeight="600">
                                    LKR {amount}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccessTime sx={{ fontSize: 16, mr: 0.5 }} /> Estimated Time: {estimatedTime}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{
                            py: 1.5,
                            borderRadius: 1,
                            fontWeight: 'bold',
                            backgroundColor: '#e51e36',
                            '&:hover': { backgroundColor: '#c31a2e' }
                        }}
                        onClick={btnClick}
                    >
                        BOOK NOW
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default BookingCard;
