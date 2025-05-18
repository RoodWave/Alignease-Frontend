import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
  Paper,
  Grid,
} from '@mui/material';

const IssueReport = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    serviceType: '',
    issueTitle: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleClear = () => {
    setFormData({
      fullName: '',
      email: '',
      contactNumber: '',
      serviceType: '',
      issueTitle: '',
      description: ''
    });
  };

  const serviceTypes = [
    { value: 'wheel-alignment', label: 'Wheel Alignment' },
    { value: 'tire-replacement', label: 'Tire Replacement' },
    { value: 'oil-change', label: 'Oil Change' },
    { value: 'brake-service', label: 'Brake Service' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 1 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Tell Us About a Problem with Your Service
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Kavindu Kaihara"
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Kavindu.kaihara@gmail.com"
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Contact Number
              </Typography>
              <TextField
                fullWidth
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Service Type
              </Typography>
              <TextField
                select
                fullWidth
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                placeholder="Select Service Type"
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              >
                {serviceTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Issue Title
              </Typography>
              <TextField
                fullWidth
                name="issueTitle"
                value={formData.issueTitle}
                onChange={handleChange}
                placeholder="Enter Issue Title"
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Issue Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Issue Description"
                variant="outlined"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: '#DB002B',
                    color: 'white',
                    borderRadius: 0,
                    px: 4,
                    py: 1,
                    '&:hover': {
                      bgcolor: '#C4002B',
                    },
                    width: 135
                  }}
                >
                  SAVE
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleClear}
                  sx={{
                    color: '#DB002B',
                    borderColor: '#DB002B',
                    borderRadius: 0,
                    px: 4,
                    py: 1,
                    '&:hover': {
                      borderColor: '#C4002B',
                      bgcolor: 'transparent',
                    },
                    width: 135
                  }}
                >
                  CLEAR
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default IssueReport;