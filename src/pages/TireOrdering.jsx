import React from 'react'
import Banner from '../components/Banner'
import BannerImage from '../assets/products/bannerImg.png';
import { Container } from '@mui/system';
import ProductImage1 from '../assets/products/product1.png';
import ProductImage2 from '../assets/products/product2.png';
import ProductImage3 from '../assets/products/product3.png';
import ProductImage4 from '../assets/products/product4.png';
import ProductImage5 from '../assets/products/product5.png';
import ProductImage6 from '../assets/products/product6.png';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';

  const products = [
    {
      id: 1,
      brand: "PNEU",
      model: "XP Street Grip",
      description: "Street tire with confidence-inspiring dry and wet road grip.",
      imageUrl: ProductImage1,
      tagline: "",
      price: "35,800",
      currency: "LKR",
      quantity: "",
    },
    {
      id: 2,
      brand: "Bridgestone",
      model: "Dueler A/T",
      description: "All-terrain toughness meets on-road comfort. Built for SUVs and pickups.",
      imageUrl: ProductImage2,
      price: "30,000",
      currency: "LKR",
      quantity: "",
    },
    {
      id: 3,
      brand: "Desert",
      model: "Rider Series",
      description: "Designed for harsh conditions and endurance with superior reliability and traction.",
      imageUrl: ProductImage3,
      price: "28,000",
      currency: "LKR",
      quantity: "",
    },
    {
      id: 4,
      brand: "NextGen",
      model: "Eco Tread",
      description: "Fuel-saving performance with precision engineering and low rolling resistance.",
      imageUrl: ProductImage4,
      price: "32,900",
      currency: "LKR",
      quantity: "",
    },
    {
      id: 5,
      brand: "Performance",
      model: "Pro Sport",
      description: "High-performance with optimal cornering and exceptional handling.",
      imageUrl: ProductImage5,
      price: "36,200",
      currency: "LKR",
      quantity: "",
    },
    {
      id: 6,
      brand: "PNEU",
      model: "XP Silent Drive",
      description: "Enjoy a smooth, quiet ride engineered for premium comfort and reduced noise.",
      imageUrl: ProductImage6,
      price: "30,400",
      currency: "LKR",
      quantity: "",
    }
  ];
const TireOrdering = () => {
  return (
    <Box sx={{ width: '100%'}}>
    {/* Hero Banner */}
    <Banner title='Tire Ordering' description='Browse top-quality brands, find the perfect fit for your vehicle, and order with just a few clicks. Fast delivery and expert installation available.' image={BannerImage} />

    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          color: '#333',
        }}
      >
        Products
      </Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard imageUrl={product.imageUrl}
              brand={product.brand}
              model={product.model}
              description={product.description}
              quantity={product.quantity || "01"} // Default value if not provided 
              price={product.price}
              currency={product.currency} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
  )
}

export default TireOrdering