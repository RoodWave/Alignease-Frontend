import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import BannerImage from '../assets/ourServicesAndProducts/bannerImg.png';
import ServiceImage1 from '../assets/ourServicesAndProducts/services/service1.png';
import ServiceImage2 from '../assets/ourServicesAndProducts/services/service2.png';
import ServiceImage3 from '../assets/ourServicesAndProducts/services/service3.png';
import ServiceImage4 from '../assets/ourServicesAndProducts/services/service4.png';
import ServiceImage5 from '../assets/ourServicesAndProducts/services/service5.png';
import ProductImage1 from '../assets/products/product1.png';
import ProductImage2 from '../assets/products/product2.png';
import ProductImage3 from '../assets/products/product3.png';
import ProductImage4 from '../assets/products/product4.png';
import ProductImage5 from '../assets/products/product5.png';
import ProductImage6 from '../assets/products/product6.png';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import ourServicesService from '../services/OurServicesService';
import commonService from '../services/CommonService';




  // Sample service data
  const services = [
    {
      id: 1,
      title: 'Tire Ordering',
      image: ServiceImage1,
      path: '/services/tire-ordering'
    },
    {
      id: 2,
      title: 'Wheel Balancing',
      image: ServiceImage2,
      path: '/services/wheel-balancing'

    },
    {
      id: 3,
      title: 'Nitrogen Filling',
      image: ServiceImage3,
      path: '/services/nitrogen-filling'
    },
    {
      id: 4,
      title: 'Tire Patching and Vulcanizing',
      image: ServiceImage4,
      path: '/services/tire-patching'
    },
    {
      id: 5,
      title: 'Parts Replacement',
      image: ServiceImage5,
      path: '/services/part-replacement'
    },
  ];



const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
      const [servicesWithImages, setServicesWithImages] = useState([]);
      const userId = localStorage.getItem("userId")
  
      const getAllServices = async () => {
          try {
              const res = await ourServicesService.getAllServices();
  
              if (res?.services) {
                  const productPromises = res.services.map(async (service) => {
                      const imageBlobUrl = await commonService.getProductImage(service.imageName);
  
                      return {
                        id: service.serviceId,
                        title: service.name,
                        image: imageBlobUrl,
                        path: '/services/tire-ordering'
                      };
                  });
  
                  const services = await Promise.all(productPromises);
  
                  console.log({ services });
  
                  setServicesWithImages(services);
              }
          } catch (error) {
              console.error("Error fetching services with images", error);
          }
      };
      console.log({servicesWithImages});
      
  
      useEffect(() => {
          getAllServices();
      }, []);
  



  // Sample product data

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


  return (
    <Box sx={{ width: '100%', bgcolor: '#f8f8f8' }}>
      {/* Hero Banner */}
      <Banner image={BannerImage} title='OUR SERVICES & PRODUCTS' description='Reliable care, effortless service, and peace of mind—drive worry-free.Schedule with ease, get expert attention, and keep your vehicle in top shape wherever the road takes ' />

      {/* Services Section */}
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
          Services
        </Typography>

        <Grid container spacing={5} sx={{
          justifyContent: 'center'
        }}>
          {servicesWithImages.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <ServiceCard title={service.title} image={service.image} path={service.path} id={service.id}/>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Products Section */}
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
  );
};

export default Services;