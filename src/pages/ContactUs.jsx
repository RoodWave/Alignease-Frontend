import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, MenuItem, Select, FormControl } from "@mui/material";
import ContactUsImage from '../assets/ContactusImg.png';
import { useNavigate } from "react-router-dom";
import userServices from "../services/AuthServices.js";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        // User type validation
        if (!formData.userType) {
            newErrors.userType = 'Please select a user type';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const userDTO = {
                email: formData.email,
                password: formData.password,
                userType: formData.userType
            };

            const response = await userServices.signIn(userDTO);
            console.log("response : ", response);

            if (response?.status === "success") {
                localStorage.setItem("userId", response.user.userId);
                localStorage.setItem("userName", response.user.userName);

                if (response?.user?.userType === "CUSTOMER") {
                    navigate("/home");
                } else if (response?.user?.userType === "ADMIN") {
                    navigate("/admin-dashboard");
                }
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Error in Login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container sx={{  overflow: 'hidden' }}>
            <Grid item xs={12} md={6}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',py:5, px:3 }}>
                <Box sx={{
                    border: '1px solid #D8D8D8',
                    padding: 4,
                    borderRadius: "25px",
                    width: '100%',
                    maxWidth: 450,
                    margin: '0 auto',
                }}>
                    <Typography variant="h4" component="h1" align="left" gutterBottom
                        sx={{ fontWeight: 600, color: '#DB002B' }}>
                  CONTACT US
                    </Typography>
                    <Typography variant="body2" align="left" sx={{ mb: 3, color: '#757575' }}>
                    Reach out to us for bookings, service inquiries, or assistance — our team is ready to provide quick and reliable support to keep your vehicle running smoothly.
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>                        
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>Full Name</Typography>
                            <TextField
                                fullWidth
                                name="email"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                size="small"
                                sx={{ 
                                    backgroundColor: '#FFFFFF',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D8D8D8',
                                    }
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>Email</Typography>
                            <TextField
                                fullWidth
                                name="email"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                size="small"
                                sx={{ 
                                    backgroundColor: '#FFFFFF',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D8D8D8',
                                    }
                                }}
                            />
                        </Box>
                        
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>Message</Typography>
                            <TextField
                            fullWidth
                            variant="outlined"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            multiline
                            rows={5}
                            sx={{backgroundColor: '#FFFFFF'}}
                        />
                        </Box>

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#DB002B',
                                color: 'white',
                                '&:hover': { backgroundColor: '#df1a40' },
                                py: 1.5,
                                mt: 2,
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold'
                            }}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Box>

                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ 
                    display: { xs: 'none', sm: 'flex' },
                    height: '100vh', 
                    alignItems:'end'
                }}>
                <Box
                    component="img"
                    src={ContactUsImage}
                    alt="Auto Service"
                    sx={{
                        width: "100%",
                        height: '85%',
                        objectFit:'cover'
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Login;