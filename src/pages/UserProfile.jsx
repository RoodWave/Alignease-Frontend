import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Paper,
    Avatar,
    Button,
    Container,
    Card,
    Rating,
    Stack,
    Grid
} from '@mui/material';
import { Star } from 'lucide-react';
const UserProfile = () => {
    const [rating, setRating] = useState(3);

    // Mock user data
    const userData = {
        fullName: "Kavindu Kaihara",
        email: "Kavindu.kaihara@gmail.com",
        userType: "Customer"
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Account Settings Section */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: '#FFFFFF'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 3,
                        fontSize: '1.1rem'
                    }}
                >
                    Account Settings
                </Typography>

                {/* User header card */}
                <Card
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        mb: 3,
                        backgroundImage: 'linear-gradient(to right, #F8D7DA, #E9687C)',
                        borderRadius: 2,
                        boxShadow: 'none'
                    }}
                >
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: '#E0E0E0',
                            mr: 2
                        }}
                    />
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: '#000000'
                            }}
                        >
                            {userData.fullName}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#000000'
                            }}
                        >
                            {userData.email}
                        </Typography>
                    </Box>
                </Card>

                {/* Form fields */}
                <Grid container spacing={2} rowGap={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Full Name
                        </Typography>
                        <TextField
                            fullWidth
                            value={userData.fullName}
                            variant="outlined"
                            size="small"
                            disabled
                            sx={{
                                bgcolor: '#F9F9F9',
                                '& .MuiOutlinedInput-root': {
                                    borderColor: '#F9F9F9'
                                }
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            User Type
                        </Typography>
                        <TextField
                            fullWidth
                            value={userData.userType}
                            variant="outlined"
                            size="small"
                            disabled
                            sx={{
                                bgcolor: '#F9F9F9',
                                '& .MuiOutlinedInput-root': {
                                    borderColor: '#F9F9F9'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                    <Typography variant="body2" sx={{ mb: 1 }}>
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            value={userData.email}
                            variant="outlined"
                            size="small"
                            disabled
                            sx={{
                                bgcolor: '#F9F9F9',
                                '& .MuiOutlinedInput-root': {
                                    borderColor: '#F9F9F9'
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Feedback Section */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    bgcolor: '#FFFFFF'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 3,
                        fontSize: '1.1rem'
                    }}
                >
                    Feedback
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Full Name
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter Your Name"
                            variant="outlined"
                            size="small"
                            sx={{
                                bgcolor: '#F8F8F8',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5
                                }
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Your feedback
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Say your experience"
                            variant="outlined"
                            sx={{
                                bgcolor: '#F8F8F8',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5
                                }
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Your Service Rating
                        </Typography>
                        <Rating
                            name="service-rating"
                            value={rating}
                            onChange={(_, newValue) => {
                                setRating(newValue);
                            }}
                            icon={<Star fill="#FFD700" color="#FFD700" size={30} />}
                            emptyIcon={<Star color="#E0E0E0" size={30} />}
                            max={5}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#DC143C',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: '#C41232',
                                },
                                borderRadius: 1,
                                width: 150,
                                textTransform: 'uppercase',
                                fontWeight: 'bold'
                            }}
                        >
                            Save
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                color: '#DC143C',
                                borderColor: '#DC143C',
                                borderRadius: 1,
                                width: 150,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                '&:hover': {
                                    borderColor: '#C41232',
                                }
                            }}
                        >
                            Clear
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default UserProfile