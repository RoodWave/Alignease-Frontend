import {
    Box
} from '@mui/material';
import React, { useState } from 'react';
import CardImg from '../assets/tirePatching/image.png';
import BannerImage from '../assets/tirePatching/bannerImg.png';
import Banner from '../components/Banner';
import BookingCard from '../components/BookingCard';
import { useLocation } from 'react-router-dom';

const PartReplacement = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(dayjs());
    const userId = localStorage.getItem("userId")
    const location = useLocation();
    const { id } = location.state || {};

    const handleBooking = async () => {
        const payload = {
            serviceId: id,
            userId: Number(userId),
            selectedDate: selectedDate.format('YYYY-MM-DD'),
            selectedTime: selectedTime.format('HH:mm'),
        };

        try {
            const response = await ourServicesService.bookServices(payload);
            toast.success("Booking Successful!");
            console.log(response);
        } catch (error) {
            toast.error("Booking Failed!");
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Banner
                title='Parts Replacement'
                description='Restore your vehicle’s performance with high-quality parts and expert installation. Reliable replacements to keep your engine running smoothly and safely.'
                image={BannerImage}
            />

            <BookingCard
                image={CardImg}
                title="Reliable Parts Replacement by Certified Technicians"
                description={`When it comes to keeping your vehicle running at its best, worn-out or damaged parts can’t be ignored. At Align Ease, we provide professional parts replacement using high-quality, manufacturer-recommended components to ensure optimal performance and safety.\n\nFrom engine components to belts, hoses, filters, and more — our experienced technicians diagnose the issue and install replacements with precision and care. Every replacement is backed by a thorough quality check, giving you confidence on the road.Don’t let a faulty part slow you down. Book your service now and keep your vehicle in peak condition.`}
                amount="30,000"
                estimatedTime="2h"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                btnClick={handleBooking}
            />
        </Box>
    );
};

export default PartReplacement;
