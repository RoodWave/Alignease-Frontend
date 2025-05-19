import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, MenuItem, Select, FormControl } from "@mui/material";
import LoginImg from '../assets/LoginImg.png';
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
                localStorage.setItem("userData", JSON.stringify(response.user));

                if (response?.user?.userRole === "CUSTOMER") {
                    navigate("/");
                } else if (response?.user?.userRole === "ADMIN") {
                    navigate("/admin/bookings");
                }
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container sx={{ height: '100vh', padding: 0, overflow: 'hidden' }}>
            <Grid item xs={12} md={6}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',padding:{xs:'20px',md:'none'} }}>
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
                        SIGN IN
                    </Typography>
                    <Typography variant="body2" align="left" sx={{ mb: 3, color: '#757575' }}>
                        Access your personalized dashboard to manage your bookings, view service history, report issues, and receive real-time updates. Choose your user type to get started.
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>User Type</Typography>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    error={Boolean(errors.userType)}
                                    displayEmpty
                                    size="small"
                                    sx={{ 
                                        backgroundColor: '#FFFFFF',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#D8D8D8',
                                        }
                                    }}
                                >
                                    <MenuItem value="" disabled>Select user type</MenuItem>
                                    <MenuItem value="CUSTOMER">Customer</MenuItem>
                                    <MenuItem value="ADMIN">Admin</MenuItem>
                                </Select>
                                {errors.userType && <Typography variant="caption" color="error">{errors.userType}</Typography>}
                            </FormControl>
                        </Box>
                        
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>Email Address</Typography>
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
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>Password</Typography>
                            <TextField
                                fullWidth
                                name="password"
                                variant="outlined"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                size="small"
                                sx={{ 
                                    backgroundColor: '#FFFFFF',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D8D8D8',
                                    }
                                }}
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
                            {loading ? 'Signing in...' : 'Proceed'}
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', mt: 2, gap: 1, justifyContent: 'center' }}>
                        <Typography variant="body2">
                            If you don't have an account?
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#DB002B", cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => navigate("/sign-up")}
                        >
                            Register
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ 
                    padding: 0, 
                    display: { xs: 'none', md: 'block' },
                    height: '100vh', 
                    overflow: 'hidden' 
                }}>
                <Box
                    component="img"
                    src={LoginImg}
                    alt="Auto Service"
                    sx={{
                        width: "100%",
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block', 
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Login;