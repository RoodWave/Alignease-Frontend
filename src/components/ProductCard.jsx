import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const ProductCard = ({
  imageUrl,
  brand,
  model,
  description,
  quantity,
  price,
  currency = "LKR",
}) => {
  return (
    <Card sx={{
      maxWidth: 345,
      borderRadius: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      overflow: 'hidden'
    }}>
      {/* Product Image with Overlay */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="325"
          image={imageUrl}
          alt={`${brand} ${model}`}
          sx={{ objectFit: 'cover' }}
        />
      </Box>

      {/* Product Details */}
      <CardContent sx={{ p: 2 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 0.5 }}>
          {brand} {model}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.85rem' }}>
          {description}
        </Typography>

        {/* Specifications */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              <Box component="span" sx={{ fontWeight: 'bold' }}>Qty: </Box>
              {quantity}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="div" sx={{ fontSize: 14, fontWeight: 500, textAlign: 'right' }}>
              {currency} {price}
            </Typography>
          </Grid>
        </Grid>

        {/* Price and Buy Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#d32f2f',
              '&:hover': { bgcolor: '#b71c1c' },
              textTransform: 'uppercase',
              px: 2,
              fontSize: '0.85rem',
              fontWeight: 'bold'
            }}
          >
            Buy Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;