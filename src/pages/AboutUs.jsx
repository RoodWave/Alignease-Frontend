import React from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Stack,
    useTheme,
    useMediaQuery
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import ComputerIcon from '@mui/icons-material/Computer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AboutUsImage from '../assets/AboutUsImg.png';

const AboutUs = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Key features with icons
    const features = [
        {
            icon: <ComputerIcon fontSize="large" />,
            text: "Powerful web-based platform for easy appointment booking"
        },
        {
            icon: <AccessTimeIcon fontSize="large" />,
            text: "Real-time service updates and tracking"
        },
        {
            icon: <SpeedIcon fontSize="large" />,
            text: "Faster and more efficient service delivery"
        },
        {
            icon: <SecurityIcon fontSize="large" />,
            text: "Transparent pricing and detailed service reports"
        },
        {
            icon: <SettingsIcon fontSize="large" />,
            text: "Modern equipment and skilled technicians"
        }
    ];

    return (
        <Box sx={{mt:5, display:'flex', justifyContent:'center'}}>
            <Grid container spacing={4}>
                {/* Mechanic Image */}
                <Grid item xs={12} md={6} sx={{
                    padding: 0,
                }}>
                    <Box
                        component="img"
                        src={AboutUsImage}
                        alt="Auto Service"
                        sx={{
                            width: "100%",
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Grid>

                {/* About Us Content */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ px: { xs: 0, md: 8 }, py:5 }}>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            ABOUT US
                        </Typography>

                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                mb: 3
                            }}
                        >
                            Driving Service Excellence with Technology and Trust
                        </Typography>

                        <Typography
                            variant="body1"
                            paragraph
                            sx={{ mb: 3 }}
                        >
                            At Align Ease, we're transforming the way vehicle maintenance is delivered
                            through the perfect blend of mechanical expertise and digital innovation. Our
                            goal is simple — to provide a smarter, faster, and more transparent way for
                            customers to access essential tire and alignment services.
                        </Typography>

                        <Typography
                            variant="body1"
                            paragraph
                            sx={{ mb: 3 }}
                        >
                            With years of industry experience, our certified technicians deliver precision-driven
                            services including tire ordering, wheel balancing, nitrogen filling, and part
                            replacement. Backed by a powerful web-based platform, customers can easily book
                            appointments, track their service history, report issues, and receive real-time
                            updates — all from one place.
                        </Typography>

                        <Typography
                            variant="body1"
                            paragraph
                            sx={{ mb: 4 }}
                        >
                            We prioritize customer satisfaction, operational efficiency, and safety in everything
                            we do. Whether you're a regular driver or a fleet operator, Align Ease is committed to
                            keeping your wheels aligned, your tires healthy, and your ride smooth. Our services are
                            designed to save you time and reduce the hassle of traditional vehicle maintenance. With
                            features like online booking, real-time service updates, and automated reminders, we bring
                            convenience to your fingertips. Backed by skilled technicians and modern equipment, we
                            ensure every job is done with accuracy, transparency, and care — because your safety and
                            satisfaction are what drive us forward.
                        </Typography>

                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AboutUs;