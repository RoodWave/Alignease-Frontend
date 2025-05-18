import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import SignUpImg from '../assets/Signin.png';
import { useNavigate } from "react-router-dom";
import userServices from '../services/UserServices';
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        userType: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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

        // Full Name validation
        if (!formData.userName) {
            newErrors.userName = 'Full Name is required';
        }

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

    const handleSignUp = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        const basePayload = {
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
            userType: formData.userType
        };

        // let finalPayload = { userDTO: basePayload };

        try {
            const response = await userServices.signUp(basePayload);
            console.log("Sign up response:", response);

            if (response?.status === "success") {
                toast.success(response.message);
                navigate("/login");
            } else {
                toast.error(response.message || "Sign up failed. Please try again.");
            }
        } catch (error) {
            console.log("Error during sign up:", error);
            toast.error("An error occurred during sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
            {/* Left side - Image */}
            <Grid item xs={12} md={6} sx={{ 
                padding: 0, 
                display: { xs: 'none', md: 'block' },
                height: '100vh',
                overflow: 'hidden'
            }}>
                <Box
                    component="img"
                    src={SignUpImg}
                    alt="Auto Service"
                    sx={{
                        width: "100%",
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </Grid>

            {/* Right side - Form */}
            <Grid item xs={12} md={6}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',padding:{xs:'20px',md:'none'}  }}>
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
                        SIGN UP
                    </Typography>
                    <Typography variant="body2" align="left" sx={{ mb: 3, color: '#757575' }}>
                        Join our platform to book services, track your vehicle's maintenance, get real-time notifications, and enjoy a seamless service experience. Select your user type to get started.
                    </Typography>

                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>Full Name</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                error={Boolean(errors.userName)}
                                helperText={errors.userName}
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
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>User Type</Typography>
                            <Select
                                fullWidth
                                displayEmpty
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                error={Boolean(errors.userType)}
                                size="small"
                                sx={{ 
                                    backgroundColor: '#FFFFFF',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D8D8D8',
                                    }
                                }}
                            >
                                <MenuItem value="" disabled>Select Type</MenuItem>
                                <MenuItem value="CUSTOMER">Customer</MenuItem>
                                <MenuItem value="ADMIN">Admin</MenuItem>
                            </Select>
                            {errors.userType && <Typography variant="caption" color="error">{errors.userType}</Typography>}
                        </Box>
                        
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1,fontWeight:600 }}>Email Address</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="email"
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
                                variant="outlined"
                                type="password"
                                name="password"
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
                            variant="contained"
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
                            onClick={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Proceed'}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2, gap: 1, justifyContent: 'center' }}>
                        <Typography variant="body2">
                            Already have an account?
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#DB002B", cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => navigate("/login")}>
                            Login
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignUp;