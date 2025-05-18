import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import Service1 from "../assets/services/Service1.png"
import Service2 from "../assets/services/Service2.png"
import Service3 from "../assets/services/Service3.png"
import Service4 from "../assets/services/Service4.png"
import OurServiceCard from "./OurServiceCard.jsx";

const OurServices = () => {

    const services = [
        {
            title: "Tire Ordering",
            content: "Browse a wide range of tire brands, sizes, and models to suit your vehicle. With real-time stock updates, expert recommendations, and easy online ordering, you can schedule installation at your convenience — fast, simple, and reliable.",
            icon: Service1
        },
        {
            title: "Wheel Balancing",
            content: "Eliminate vibrations and extend tire life with our precision wheel balancing service. Using industry-grade equipment, we ensure smoother rides, better handling, and improved tire performance.",
            icon: Service2
        },
        {
            title: "Nitrogen Filling",
            content: "Get improved fuel efficiency and tire life with our nitrogen filling service — safer, more stable, and better for performance, especially on long drives and varying road conditions",
            icon: Service3
        },
        {
            title: "Part Replacement",
            content: "We offer genuine part replacements for tires, valves, sensors, and more. With transparent pricing and expert installation, we keep your vehicle safe, reliable, and ready for the road",
            icon: Service4
        },
    ];

    return (
        <Grid container p={4} >
            <Grid item xs={12}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}>
                    <Typography sx={{fontWeight: 600, fontSize: 14, color: '#9F9F9F'}}>
                        Our Services
                    </Typography>
                    <Typography sx={{fontWeight: 600, maxWidth: 450, fontSize: 20, textAlign: 'center'}}>
                    Your One-Stop Wheel & Tire Service Center
                    </Typography>
                </Box>

            </Grid>

            {services.map((service) => (
                <Grid item xs={12} sm={6} md={3}>
                    <OurServiceCard service={service}/>
                </Grid>
            ))}

        </Grid>
    );
};

export default OurServices;