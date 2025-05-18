import React from 'react';
import { Box, Grid, IconButton, Link, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../assets/footer/Logo1.png';
import FacebookIcon from '../assets/Footer/facebookIcon.png'
import InstagramIcon from '../assets/Footer/instagramIcon.png'
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#000000',
                color: 'white',
                py: 3,
                px: { xs: 2, sm: 10 }
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Box mb={2}>
                        <img src={logo} alt="logo" style={{
                            width: '200px',
                            height: '60px',
                            marginBottom: '5px'
                        }} />
                    </Box>
                    <Typography variant="body2" color={"#BDBDBD"}>
                        Your trusted partner for smart, reliable vehicle maintenance—precision service, easy scheduling, and peace of mind every mile. Expert care with cutting-edge tech to keep you driving safely.
                    </Typography>
                    <Box mt={2}>
                        <IconButton
                            color="inherit"
                            aria-label="Facebook"
                        >
                            <img src={FacebookIcon} alt="facebookIcon" style={{ width: '30px', height: '30px' }} />
                        </IconButton>

                        <IconButton color="inherit" aria-label="Instagram">
                            <img src={InstagramIcon} alt="instagramIcon" style={{ width: '30px', height: '30px' }} />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item display={{
                    xs: 'none',
                    sm: 'flex',
                }} sm={2} />
                <Grid item xs={12} sm={2} mt={{ xs: 4 }}>
                    <Typography sx={{
                        fontSize: '17px',
                        fontWeight: '600'
                    }} gutterBottom>
                        USEFUL LINKS
                    </Typography>
                    <Typography onClick={() => navigate('/')} color="inherit"
                        sx={{ mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                        Home
                    </Typography>
                    <Typography onClick={() => navigate('services')} color="inherit"
                        sx={{ mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                        Services
                    </Typography>
                    <Typography onClick={() => navigate('bookings')} color="inherit"
                        sx={{ mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                        Bookings
                    </Typography>
                    <Typography onClick={() => navigate('about-us')} color="inherit"
                        sx={{ mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                        About Us
                    </Typography>
                    <Typography onClick={() => navigate('contact-us')} color="inherit"
                        sx={{ mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                        Contact Us
                    </Typography>
                </Grid>
                <Grid item display={{
                    xs: 'none',
                    sm: 'flex',
                }} sm={2} />
                <Grid item xs={12} sm={2.9} mt={{ xs: 4 }}>
                    <Typography sx={{
                        fontSize: '17px',
                        fontWeight: '600'
                    }} gutterBottom>
                        CONTACTS
                    </Typography>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <LocationOnIcon sx={{ mr: 1 }} />
                        <Typography sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
                            251 /A Galle Road,
                            Bamblapitiya
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 1 }} onClick={() => window.location.href = 'tel:+61 450 225 194'}>
                        <PhoneIcon sx={{ mr: 1 }} />
                        <Typography
                            sx={{ mb: 1, fontSize: 14, fontWeight: 500, color: 'white', textDecoration: 'underline' }}>+61
                            +94 789 765 451</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <EmailIcon sx={{ mr: 1 }} />
                        <Link href="mailto:mindeaase@gmail.com" color="inherit"
                            sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
                            alignease@gmail.com
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
