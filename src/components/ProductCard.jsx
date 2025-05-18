import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from "@mui/material";
import { useState } from "react";
import productService from "../services/ProductService";
import { toast } from "react-toastify";


const ProductCard = ({
    productId,   // <-- new prop
    userId,      // <-- new prop
    imageUrl,
    brand,
    model,
    description,
    quantity,
    price,
    currency = "LKR",
}) => {
    const [loading, setLoading] = useState(false);

    const handleBuyNow = async () => {
        console.log({userId,productId});
        
        if (!userId || !productId) {
            toast.warn("User or Product ID missing");
            return;
        }

        const productDTO = {
            productId,
            userId,
            quantity: 1 // or let user choose
        };

        try {
            setLoading(true);
            const res = await productService.bookProduct(productDTO);
            toast.success("Product purchased successfully!");
            console.log(res); // Optional: see response
        } catch (err) {
            toast.error("Booking failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{
            maxWidth: 345,
            borderRadius: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            overflow: 'hidden'
        }}>
            {/* Product Image */}
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleBuyNow}
                        disabled={loading}
                        sx={{
                            bgcolor: '#d32f2f',
                            '&:hover': { bgcolor: '#b71c1c' },
                            textTransform: 'uppercase',
                            px: 2,
                            fontSize: '0.85rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? "Processing..." : "Buy Now"}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
