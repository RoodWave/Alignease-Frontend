import {
    Box
} from '@mui/material';
import React, { useState } from 'react';
import CardImg from '../assets/nitrogenFilling/image.png';
import BannerImage from '../assets/nitrogenFilling/bannerImg.png';
import Banner from '../components/Banner';
import BookingCard from '../components/BookingCard';

const NitrogenFilling = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(dayjs());
    const userId = localStorage.getItem("userId")


    const handleBooking = async () => {
        const payload = {
            serviceId: 2,
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
                title='Nitrogen Filling'
                description='Improve tire performance, extend lifespan, and maintain pressure longer with professional nitrogen tire inflation. Drive cooler, safer, and smarter.'
                image={BannerImage}
            />

            <BookingCard
                image={CardImg}
                title="Boost Tire Efficiency with Nitrogen Filling"
                description={`Nitrogen tire inflation is a smart choice for today’s drivers. Unlike regular air, nitrogen maintains tire pressure more consistently, reduces oxidation, and keeps your tires cooler under pressure. This results in better fuel efficiency, longer tire life, and enhanced safety—especially during long drives and extreme weather.\n\nAt Align Ease, we use high-purity nitrogen and professional-grade equipment to ensure every tire is properly filled to the manufacturer’s recommended level. Choose nitrogen for a smoother, safer, and more economical ride. It’s a small change that makes a big difference. Book your nitrogen filling service today and feel the difference on every journey.`}
                amount="20,000"
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

export default NitrogenFilling;
