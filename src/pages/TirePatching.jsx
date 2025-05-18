import {
    Box
} from '@mui/material';
import React, { useState } from 'react';
import CardImg from '../assets/tirePatching/image.png';
import BannerImage from '../assets/tirePatching/bannerImg.png';
import Banner from '../components/Banner';
import BookingCard from '../components/BookingCard';

const TirePatching = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    return (
        <Box sx={{ width: '100%' }}>
            <Banner
                title='Tire Patching & Vulcanizing'
                description='Restore your tires’ integrity with expert patching and vulcanizing. Safe, cost-effective solutions to keep you moving without replacing your tires.'
                image={BannerImage}
            />

            <BookingCard
                image={CardImg}
                title="Extend Tire Life with Professional Patching & Vulcanizing"
                description={`Tire damage doesn't always mean replacement. Our advanced patching and vulcanizing service restores damaged tires, sealing punctures and reinforcing weakened areas with durable, heat-cured materials.\n\nAt Align Ease, we carefully inspect and repair your tires using industry-grade tools and proven techniques. Whether it’s a nail puncture, sidewall scuff, or tread damage, we bring your tire back to a safe, road-ready condition.This process not only saves you money but also ensures safety and reliability on every drive.Book your session today and give your tires a second life.`}
                amount="5,000"
                estimatedTime="2h"
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
            />
        </Box>
    );
};

export default TirePatching;
