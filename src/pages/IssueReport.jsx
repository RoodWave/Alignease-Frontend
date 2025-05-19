import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import reportService from '../services/ReportService';

const IssueReport = () => {
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterEmail: '',
    reporterContact: '',
    service: '',
    issueTitle: '',
    issueDescription: ''
  });

  const [loading, setLoading] = useState(false);

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_USER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CLIENT;
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

console.log({
  EMAILJS_ADMIN_TEMPLATE_ID,EMAILJS_PUBLIC_KEY,EMAILJS_SERVICE_ID,EMAILJS_USER_TEMPLATE_ID
});



  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const getServiceLabel = (value) => {
    const service = serviceTypes.find(type => type.value === value);
    return service ? service.label : value;
  };

  const sendEmails = async (formData) => {
    try {
      // Send confirmation email to user
      const userEmailParams = {
        to_email: formData.reporterEmail,
        to_name: formData.reporterName,
        service_type: getServiceLabel(formData.service),
        issue_title: formData.issueTitle,
        issue_description: formData.issueDescription,
        contact_number: formData.reporterContact || "Not provided"
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        userEmailParams
      );

      // Send notification email to admin
      const adminEmailParams = {
        to_email: formData.reporterEmail,
        reporter_name: formData.reporterName,
        reporter_email: formData.reporterEmail,
        reporter_contact: formData.reporterContact || "Not provided",
        service_type: getServiceLabel(formData.service),
        issue_title: formData.issueTitle,
        issue_description: formData.issueDescription
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        adminEmailParams
      );

      return true;
    } catch (error) {
      console.error("Error sending emails:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.reporterName || !formData.reporterEmail || !formData.service || !formData.issueTitle) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.reporterEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);

      // Map form data to match API payload structure
      const payload = {
        reporterName: formData.reporterName,
        reporterEmail: formData.reporterEmail,
        reporterContact: formData.reporterContact,
        service: formData.service,
        issueTitle: formData.issueTitle,
        issueDescription: formData.issueDescription
      };

      // Call the API
      const response = await reportService.addReport(payload);
      console.log({response});
      
      if (response.status === "success") {
        console.log('if');
        
        const emailSent = await sendEmails(formData);

        if (emailSent) {
          toast.success('Your issue has been reported successfully. A confirmation email has been sent to your inbox.');
        } else {
          toast.warning('Your issue has been reported successfully, but we could not send confirmation emails.');
        }

      }


      // Send confirmation emails after successful API submission

      // Clear form after successful submission
      handleClear();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit the report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      reporterName: '',
      reporterEmail: '',
      reporterContact: '',
      service: '',
      issueTitle: '',
      issueDescription: ''
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
                Full Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="reporterName"
                value={formData.reporterName}
                onChange={handleChange}
                placeholder="John Doe"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Email <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="reporterEmail"
                value={formData.reporterEmail}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Contact Number
              </Typography>
              <TextField
                fullWidth
                name="reporterContact"
                value={formData.reporterContact}
                onChange={handleChange}
                placeholder="+1234567890"
                variant="outlined"
                size="small"
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Service Type <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                select
                fullWidth
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
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
                Issue Title <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                name="issueTitle"
                value={formData.issueTitle}
                onChange={handleChange}
                placeholder="Brief description of the issue"
                variant="outlined"
                size="small"
                required
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Issue Description <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={5}
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleChange}
                placeholder="Please provide details about your issue"
                variant="outlined"
                required
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
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
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'SUBMIT'}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleClear}
                  disabled={loading}
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