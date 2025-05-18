import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, image, path ,id}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{
      position: 'relative',
      maxHeight: '392px',
      width: '100%',
      overflow: 'hidden',
      borderRadius: '20px',
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="100%"
          image={image}
          alt={title}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            px: 2,
            pb: 3
          }}
        >
          <Typography variant="h6" component="div" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
            {title}
          </Typography>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size='small'
            sx={{
              backgroundColor: '#DB002B',
              color: 'white',
              '&:hover': { backgroundColor: '#df1a40' },
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontWeight: 'bold'
            }}
            onClick={() => navigate(path,{state:{id}})}
          >
            VIEW DETAILS
          </Button>
        </Box>
      </Box>


    </Card>
  );
};

export default ServiceCard;
