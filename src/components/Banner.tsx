import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import theme from '../theme';

const Banner = ({ title, description, image }) => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${image})`,
                objectFit: 'cover',
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 8
            }}
        >
            <Box sx={{
                maxWidth: '600px'
            }}>
                <Typography
                    align="center"
                    color="white"
                    sx={{
                        fontWeight: '600',
                        mb: 1,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontSize:'4.2rem'
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    align="center"
                    color="white"
                    sx={{
                        maxWidth: '800px',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                        fontSize: '1rem',
                        mt: 3
                    }}
                >
                    {description}</Typography> </Box>

        </Box>
    )
}

export default Banner