import React, { useEffect, useState } from 'react'
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
import productService from '../services/ProductService';
import commonService from '../services/CommonService';

const initialData = [
    {
        "brand": "PNEU",
        "model": "XP Street Grip",
        "imageUrl": ProductImage1,
        "price": "35800",
        "currency": "LKR",
        "quantity": ""
    },
    {
        "brand": "Bridgestone",
        "model": "Dueler A/T",
        "imageUrl": ProductImage2,
        "price": "30000",
        "currency": "LKR",
        "quantity": ""
    },
    {
        "brand": "Desert",
        "model": "Rider Series",
        "imageUrl": ProductImage3,
        "price": "28000",
        "currency": "LKR",
        "quantity": ""
    }
]



const TireOrdering = () => {

    const [productsWithImages, setProductsWithImages] = useState(initialData);
    const userId = localStorage.getItem("userId")

    const getAllProducts = async () => {
        try {
            const res = await productService.getAllProduct();

            if (res?.products) {
                const productPromises = res.products.map(async (product) => {
                    const imageBlobUrl = await commonService.getProductImage(product.imageName);

                    return {
                        id: product.productId,
                        brand: product.brand,
                        model: product.model,
                        description: product.description,
                        imageUrl: imageBlobUrl, // this is a blob URL
                        price: product.price,
                        currency: product.currency || "LKR",
                        quantity: "", // assuming this is empty for now
                    };
                });

                const products = await Promise.all(productPromises);

                console.log({ products });

                setProductsWithImages([...initialData,products]); // set your state
            }
        } catch (error) {
            console.error("Error fetching products with images", error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);



    return (
        <Box sx={{ width: '100%' }}>
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
                    {productsWithImages.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard 
                            productId={product.id}
                            userId={userId}
                            imageUrl={product.imageUrl}
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