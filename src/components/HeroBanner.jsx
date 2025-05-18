import React from 'react';
import { Box, Typography, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import BannerImage from '../assets/HeroBannerImg.png';

const HeroBanner = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                backgroundImage: `url(${BannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        maxWidth: 600,
                        ml: { xs: 0, md: 'auto' },
                        textAlign: { xs: 'center', md: 'left' },
                        px: { xs: 2, sm: 4 },
                    }}
                >
                    <Typography
                        variant={isMobile ? 'h4' : 'h3'}
                        component="h1"
                        gutterBottom
                        fontWeight="bold"
                    >
                        <Box component="span" sx={{ color: '#d32f2f' }}>
                            Precision
                        </Box>{' '}
                        That Drives
                        <br />
                        Confidence
                    </Typography>

                    <Typography
                        variant="body1"
                        paragraph
                        sx={{ mb: 4, color: 'grey.300' }}
                    >
                        From tire alignment to complete wheel care, Align Ease delivers fast, reliable, and professional services that keep your vehicle running smoothly. Book online, track your service history, and stay informed every step of the way.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: '#b71c1c',
                            },
                        }}
                    >
                        LET’S GO !
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default HeroBanner;
