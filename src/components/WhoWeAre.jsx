import React from 'react';
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import AboutUsImg from "../assets/aboutUs/AboutUsImg.png";
import Image1 from "../assets/aboutUs/image1.png";
import Image2 from "../assets/aboutUs/image2.png";
import Image3 from "../assets/aboutUs/image3.png";
import Image4 from "../assets/aboutUs/image4.png";
import Image5 from "../assets/aboutUs/image5.png";

const WhoWeAre = () => {
    const serviceBadges = [
        { icon: Image1 },
        { icon: Image2 },
        { icon: Image3 },
        { icon: Image4 },
        { icon: Image5 },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
            <Grid container spacing={4} alignItems="center">
                {/* Image Section */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src={AboutUsImg}
                        alt="About us"
                        sx={{
                            width: { xs: '100%', sm: '90%', md: '100%' },
                            maxHeight: { xs: 300, sm: 400, md: 500 },
                            objectFit: 'contain'
                        }}
                    />
                </Grid>

                {/* Text Section */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: 14,
                                color: '#9F9F9F',
                                mb: 1
                            }}
                        >
                            WHO WE ARE
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                maxWidth: 450,
                                fontSize: { xs: 20, md: 24 },
                            }}
                        >
                            Dedicated to Keeping You on the Road
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                color: '#757575',
                                mt: 2,
                                fontSize: { xs: 14, md: 16 }
                            }}
                        >
                            At Align Ease, we combine years of mechanical expertise with digital convenience. Our web-based platform lets customers book services, track maintenance, and get real-time notifications — all in one place. With a focus on customer satisfaction, we deliver transparency, efficiency, and peace of mind.
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 500,
                                color: '#757575',
                                mt: 2,
                                fontSize: { xs: 14, md: 16 }
                            }}
                        >
                            Whether you need tire ordering, wheel balancing, nitrogen filling, or part replacement, Align Ease ensures every service is handled with precision and care. Our intuitive system empowers customers with real-time access to service updates, personalized recommendations, and a complete history of their vehicle maintenance.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            mt: 4
                        }}
                    >
                        {serviceBadges.map((badge, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={badge.icon}
                                alt={`service-icon-${index}`}
                                sx={{
                                    height: { xs: 50, sm: 60, md: 70 },
                                    width: 'auto'
                                }}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default WhoWeAre;
