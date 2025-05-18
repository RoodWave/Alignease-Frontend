import React, {useState, useEffect} from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Modal,
    TextField,
    Grid,
    IconButton,
    Snackbar,
    Alert,
    Menu,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    CircularProgress
} from '@mui/material';
import {
    Add as AddIcon,
    Close as CloseIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import productService from '../services/ProductService';

const Inventory = () => {
    // State for inventory items
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal states
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
    const [currentProduct, setCurrentProduct] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        size: '',
        price: '',
        inventory: {
            quantity: '',
            location: 'Warehouse A',
            stockStatus: 'IN_STOCK'
        }
    });

    // Image upload state
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Notification state
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Menu state for action dropdown
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.getAllProduct();
            if (response.status === 'success') {
                setProducts(response.products);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to fetch products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle menu open
    const handleMenuOpen = (event, productId) => {
        setAnchorEl(event.currentTarget);
        setSelectedProductId(productId);
    };

    // Handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProductId(null);
    };

    // Handle modal open for adding new product
    const handleAddModalOpen = () => {
        setModalType('add');
        setCurrentProduct(null);
        setFormData({
            name: '',
            brand: '',
            model: '',
            size: '',
            price: '',
            inventory: {
                quantity: '',
                location: 'Warehouse A',
                stockStatus: 'IN_STOCK'
            }
        });
        setImageFile(null);
        setImagePreview(null);
        setOpenModal(true);
    };

    // Handle modal open for editing product
    const handleEditModalOpen = (product) => {
        console.log("product: ", product)
        setModalType('edit');
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            brand: product.brand,
            model: product.model,
            size: product.size,
            price: product.price,
            inventory: {
                quantity: product.inventory.quantity,
                location: product.inventory.location,
                stockStatus: product.inventory.stockStatus
            }
        });
        const fullImageUrl = product.imagePath ? `http://localhost:8080${product.imagePath}` : null;
        setImagePreview(fullImageUrl);
        setOpenModal(true);
    };

    // Handle modal close
    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentProduct(null);
        setImageFile(null);
        setImagePreview(null);
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name.includes('inventory.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                inventory: {
                    ...prev.inventory,
                    [field]: value
                }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!formData.brand || !formData.model || !formData.price || !formData.inventory.quantity) {
            showNotification('Please fill all required fields', 'error');
            return;
        }

        try {
            const productData = {
                name: formData.name,
                brand: formData.brand,
                model: formData.model,
                size: formData.size,
                price: formData.price,
                inventoryRequest: {
                    quantity: parseInt(formData.inventory.quantity),
                    location: formData.inventory.location,
                    stockStatus: formData.inventory.stockStatus
                }
            };

            if (modalType === 'add') {
                if (!imageFile) {
                    showNotification('Please upload an image', 'error');
                    return;
                }

                const formDataObj = new FormData();
                formDataObj.append('product', JSON.stringify(productData));
                formDataObj.append('image', imageFile);

                await productService.addProduct(formDataObj);
                showNotification('Product added successfully!', 'success');
            } else {
                await productService.updateProduct(productData, currentProduct.productId);
                showNotification('Product updated successfully!', 'success');
            }

            fetchProducts();
            handleModalClose();
        } catch (err) {
            console.error("Error saving product:", err);
            showNotification(`Error: ${err.message}`, 'error');
        }
    };

    // Handle product deletion
    const handleDelete = async () => {
        handleMenuClose();
        try {
            await productService.deleteProduct(selectedProductId);
            showNotification('Product deleted successfully!', 'success');
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product:", err);
            showNotification(`Error: ${err.message}`, 'error');
        }
    };

    // Show notification
    const showNotification = (message, severity) => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    // Close notification
    const handleNotificationClose = () => {
        setNotification(prev => ({...prev, open: false}));
    };

    // Modal style
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto'
    };

    return (
        <Box sx={{width: '100%', p: 2}}>
            {/* Header */}
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                <Typography variant="h5" component="h1" fontWeight="bold">
                    Inventory Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={handleAddModalOpen}
                    sx={{
                        bgcolor: '#F3F3F3',
                        borderRadius: 1,
                        boxShadow: 'none',
                        color: 'black'
                    }}
                >
                    Add New Product
                </Button>
            </Box>

            {/* Inventory Table */}
            {loading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                    <CircularProgress/>
                </Box>
            ) : error ? (
                <Typography color="error" sx={{mt: 2}}>{error}</Typography>
            ) : products.length === 0 ? (
                <Typography sx={{mt: 2}}>No products found</Typography>
            ) : (
                <TableContainer component={Paper} sx={{boxShadow: 1, borderRadius: 2}}>
                    <Table>
                        <TableHead sx={{bgcolor: '#f5f5f5'}}>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.productId} hover>
                                    <TableCell>
                                        {product.imagePath ? (
                                            <Box
                                                component="img"
                                                src={`http://localhost:8080${product.imagePath}`}
                                                alt={product.model}
                                                sx={{width: 60, height: 60, borderRadius: 1, objectFit: 'cover'}}
                                            />
                                        ) : (
                                            <Box sx={{
                                                width: 60,
                                                height: 60,
                                                bgcolor: '#f5f5f5',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 1
                                            }}>
                                                <Typography variant="caption" color="textSecondary">
                                                    No Image
                                                </Typography>
                                            </Box>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.model}</TableCell>
                                    <TableCell>{product.size}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.inventory.quantity}</TableCell>
                                    <TableCell>{product.inventory.location}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                px: 1,
                                                py: 0.5,
                                                borderRadius: 1,
                                                display: 'inline-block',
                                                bgcolor: product.inventory.stockStatus === 'IN_STOCK' ? '#e8f5e9' : '#ffebee',
                                                color: product.inventory.stockStatus === 'IN_STOCK' ? '#2e7d32' : '#c62828'
                                            }}
                                        >
                                            {product.inventory.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={(e) => handleMenuOpen(e, product.productId)}>
                                            <MoreVertIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    const product = products.find(p => p.productId === selectedProductId);
                    handleEditModalOpen(product);
                    handleMenuClose();
                }}>
                    <EditIcon sx={{mr: 1}}/> Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteIcon sx={{mr: 1}}/> Delete
                </MenuItem>
            </Menu>

            {/* Add/Edit Product Modal */}
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="product-modal"
            >
                <Box sx={modalStyle}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                        <Typography variant="h6">
                            {modalType === 'add' ? 'Add New Product' : 'Edit Product'}
                        </Typography>
                        <IconButton onClick={handleModalClose} size="small">
                            <CloseIcon/>
                        </IconButton>
                    </Box>

                    {/* Image Upload */}
                    <Box sx={{mb: 2, display: 'flex', justifyContent: 'center'}}>
                        {imagePreview ? (
                            <Box
                                component="img"
                                src={imagePreview}
                                alt="Product preview"
                                sx={{
                                    height: 150,
                                    width: 150,
                                    objectFit: 'contain',
                                    border: '1px solid #eee',
                                    borderRadius: 1
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    height: 150,
                                    width: 150,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: '#f5f5f5',
                                    borderRadius: 1
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" align="center">
                                    Product Image
                                </Typography>
                                {modalType === 'add' && (
                                    <>
                                        <input
                                            accept="image/*"
                                            style={{display: 'none'}}
                                            id="upload-image"
                                            type="file"
                                            onChange={handleImageUpload}
                                        />
                                        <label htmlFor="upload-image">
                                            <Button
                                                component="span"
                                                variant="outlined"
                                                size="small"
                                                sx={{mt: 1}}
                                            >
                                                Upload
                                            </Button>
                                        </label>
                                    </>
                                )}
                            </Box>
                        )}
                    </Box>

                    {/* Product Form */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                                size="small"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Size"
                                name="size"
                                value={formData.size}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                size="small"
                                type="number"
                                required
                                InputProps={{
                                    startAdornment: <Box component="span" sx={{mr: 1}}>$</Box>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                name="inventory.quantity"
                                value={formData.inventory.quantity}
                                onChange={handleInputChange}
                                size="small"
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="inventory.location"
                                value={formData.inventory.location}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Stock Status</InputLabel>
                                <Select
                                    name="inventory.stockStatus"
                                    value={formData.inventory.stockStatus}
                                    onChange={handleInputChange}
                                    label="Stock Status"
                                >
                                    <MenuItem value="IN_STOCK">In Stock</MenuItem>
                                    <MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                                <Button
                                    onClick={handleModalClose}
                                    sx={{width: '48%', color: '#DB002B'}}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    sx={{width: '48%', backgroundColor: '#DB002B'}}
                                >
                                    {modalType === 'add' ? 'Add' : 'Update'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            {/* Notification */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleNotificationClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleNotificationClose}
                    severity={notification.severity}
                    sx={{width: '100%'}}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Inventory;