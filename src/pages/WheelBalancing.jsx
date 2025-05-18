import { AccessTime } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { Container } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import BannerImage from '../assets/wheelBalancing/bannerImg.png';
import CardImg from '../assets/wheelBalancing/image.png';
import Banner from '../components/Banner';
import theme from '../theme';
import { TimePicker } from '@mui/x-date-pickers';
import BookingCard from '../components/BookingCard';

const Wheelbalancing = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    return (
        <Box sx={{ width: '100%' }}>
            <Banner
                title='Wheel Balancing'
                description='Enhance your vehicle’s performance and safety with precise wheel balancing. Reduce vibrations, extend tire life, and enjoy a smoother ride every time you hit the road.'
                image={BannerImage}
            />

            <BookingCard
                image={CardImg}
                title="Ensure Smooth Driving with Professional Wheel Balancing"
                description={`Unbalanced wheels can cause uneven tire wear, vibrations, and reduced fuel efficiency. At Align Ease, our expert technicians use state-of-the-art equipment to precisely balance your wheels, ensuring a smoother, safer, and more comfortable ride.\n\nRegular wheel balancing improves handling, extends the life of your tires, and helps maintain overall vehicle health. Whether you've noticed a slight vibration or it's time for routine maintenance, trust us to get your wheels perfectly aligned. Book your wheel balancing session today and experience the difference on the road.`}
                amount="30,000"
                estimatedTime="2h"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
            />
        </Box>
    );
};

export default Wheelbalancing;
