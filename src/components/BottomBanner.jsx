import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import MechanicImage from '../assets/MechanicImg.png';
import AlignLeaseTextImage from '../assets/AlignLeaseTextImg.png';

const BottomBanner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile1 = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>


            <Box
                sx={{
                    width: '100%',
                    backgroundColor: "black",
                    height: '370px',


                }}
            >
                <Box sx={{
                    width: { sm: '100%',md:'75%', lg: '50%' },
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 2
                }}>

                    <Box
                        sx={{
                            px: { xs: 2, sm: 3, md: 4 },
                            textAlign: { xs: 'center', sm: 'left' },
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            fontWeight="bold"
                            color="#ffffff"
                            sx={{
                                fontSize: '1.5rem', // Responsive font sizes
                                lineHeight: { xs: 1.4, sm: 1.5 },
                            }}
                        >
                            Trusted maintenance and
                            <br />
                            diagnostics for smooth, reliable
                            <br />
                            driving every mile.
                        </Typography>

                        <Typography
                            variant="body1"
                            paragraph
                            sx={{
                                color: 'grey.400',
                                mb: { xs: 2, sm: 4 },
                                fontSize: '1rem',
                                maxWidth: { xs: '100%', sm: 500 },
                                mx: { xs: 'auto', sm: 0 }, // Center on mobile
                            }}
                        >
                            We don't just rotate your tires — we transform your entire driving experience.
                            Our certified technicians use advanced equipment to diagnose issues before they
                            become problems. Complete inspections with every service help prevent costly
                            repairs and ensure optimal vehicle performance.
                        </Typography>
                    </Box>


                </Box>

            </Box>
            {!isMobile && (
                <Box>

                    <Box
                        component="img"
                        src={MechanicImage}
                        sx={{
                            position: 'absolute',
                            right: 1, // responsive positioning
                            bottom: 0,
                            zIndex: 2,
                            width: {
                                xs: '100%',     // full width on very small screens
                                sm: '70%',
                                md: '50%',
                                lg: '45%',
                                xl: '40%',
                            },
                            maxWidth: '450px',     // cap max image width
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                    {!isMobile1 && <Box
                        component="img"
                        src={AlignLeaseTextImage}
                        sx={{
                            position: 'absolute',
                            right: 340, // responsive positioning
                            bottom: 120,
                            zIndex: 1,
                            width: {
                                xs: '100%',     // full width on very small screens
                                sm: '70%',
                                md: '50%',
                                lg: '45%',
                                xl: '40%',
                            },
                            maxWidth: '380px',     // cap max image width
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />}
                </Box>

            )}
        </Box>
    );
};

export default BottomBanner;