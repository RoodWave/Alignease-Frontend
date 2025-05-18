import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import OurServices from '../components/OurServices';
import BottomBanner from '../components/BottomBanner';
import WhoWeAre from '../components/WhoWeAre';
import Reviews from '../components/Reviews';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <HeroBanner />
            <OurServices />
            <WhoWeAre />
            <BottomBanner />
            <Reviews/>
        </Box>
    );
};

export default Home;