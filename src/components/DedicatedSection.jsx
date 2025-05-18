import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons for service badges
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BuildIcon from '@mui/icons-material/Build';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  padding: theme.spacing(8, 0),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const ServiceBadge = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

const IconContainer = styled(Box)({
  color: '#757575',
  fontSize: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const DedicatedSection = () => {
  const serviceBadges = [
    { icon: <AccessTimeIcon fontSize="large" /> },
    { icon: <BuildIcon fontSize="large" /> },
    { icon: <AssignmentIcon fontSize="large" /> },
    { icon: <DirectionsCarIcon fontSize="large" /> }
  ];

  return (
    <SectionContainer>
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <ImageContainer>
              <Box
                component="img"
                src="/api/placeholder/600/400"
                alt="Mechanics servicing a red car"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </ImageContainer>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
              Dedicated to Keeping You on the Road
            </Typography>
            
            <Typography variant="body1" paragraph color="text.secondary">
              When it comes to your vehicle's wheel performance, every detail matters. 
              That's why our skilled technicians provide comprehensive wheel and tire 
              services designed to enhance your driving experience.
            </Typography>
            
            <Typography variant="body1" paragraph color="text.secondary">
              Our team is continually trained in the latest techniques and technologies, 
              ensuring your vehicle receives care that meets manufacturer standards and 
              exceeds your expectations.
            </Typography>
            
            <Typography variant="body1" paragraph color="text.secondary">
              Whether you need routine maintenance, emergency repairs, or performance 
              upgrades, we're committed to providing efficient, transparent service 
              that gets you back on the road safely and quickly.
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 4 }}>
              {serviceBadges.map((badge, index) => (
                <Grid item xs={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ServiceBadge elevation={3}>
                    <IconContainer>
                      {badge.icon}
                    </IconContainer>
                  </ServiceBadge>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default DedicatedSection;