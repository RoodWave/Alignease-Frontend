import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Inventory() {
  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, image: "/api/placeholder/150/150", brand: "Next Gen", model: "GX100", size: "Large", price: "US$ 20,000", availability: "Qty 10" },
    { id: 2, image: "/api/placeholder/150/150", brand: "Next Gen", model: "GX100", size: "Large", price: "US$ 20,000", availability: "Qty 10" },
    { id: 3, image: "/api/placeholder/150/150", brand: "Next Gen", model: "GX100", size: "Large", price: "US$ 20,000", availability: "Qty 10" },
    { id: 4, image: "/api/placeholder/150/150", brand: "Next Gen", model: "GX100", size: "Large", price: "US$ 50,000", availability: "Qty 10" }
  ]);

  // State for modal
  const [openModal, setOpenModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    size: '',
    price: '',
    quantity: '',
    location: 'Warehouse A',
    stockStatus: 'IN_STOCK'
  });

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle modal open/close
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      model: '',
      size: '',
      price: '',
      quantity: '',
      location: 'Warehouse A',
      stockStatus: 'IN_STOCK'
    });
    setUploadedImage(null);
    setImagePreview(null);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!uploadedImage || !formData.brand || !formData.model || !formData.price || !formData.quantity) {
      setNotification({
        open: true,
        message: 'Please fill all required fields and upload an image',
        severity: 'error'
      });
      return;
    }

    try {
      const formDataObj = new FormData();
      
      // Create the product JSON
      const productData = {
        brand: formData.brand,
        model: formData.model,
        size: formData.size,
        price: formData.price,
        inventoryRequest: {
          quantity: parseInt(formData.quantity),
          location: formData.location,
          stockStatus: formData.stockStatus
        }
      };
      
      // Append product JSON and image to FormData
      formDataObj.append('product', JSON.stringify(productData));
      formDataObj.append('image', uploadedImage);
      
      // Make API call
      const response = await fetch('http://localhost:8080/product/add', {
        method: 'POST',
        body: formDataObj,
      });
      
      if (response.ok) {
        const result = await response.json();
        // Add new item to state
        const newItem = {
          id: result.id || Date.now(),
          image: imagePreview,
          brand: formData.brand,
          model: formData.model,
          size: formData.size,
          price: `US$ ${formData.price}`,
          availability: `Qty ${formData.quantity}`
        };
        
        setInventoryItems([...inventoryItems, newItem]);
        handleCloseModal();
        
        setNotification({
          open: true,
          message: 'Product added successfully!',
          severity: 'success'
        });
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setNotification({
        open: true,
        message: 'Error adding product: ' + error.message,
        severity: 'error'
      });
    }
  };

  // Handle notification close
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Fetch inventory data
  useEffect(() => {
    // Here you would typically fetch inventory items from your API
    // Example:
    // fetch('http://localhost:8080/product/all')
    //   .then(response => response.json())
    //   .then(data => setInventoryItems(data))
    //   .catch(error => console.error('Error fetching inventory data:', error));
  }, []);

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
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Inventory
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenModal}
          sx={{ 
            bgcolor: '#F3F3F3', 
            borderRadius: 1,
            boxShadow:'none',
            color:'black'
          }}
        >
          Add New Item
        </Button>
      </Box>

      {/* Inventory Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f9f9f9' }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Action</TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.model}
                    sx={{ width: 60, height: 60, borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.availability}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'error.main', 
                      '&:hover': { bgcolor: 'error.dark' },
                      fontSize: '0.75rem',
                      py: 0.5
                    }}
                  >
                    DETAILS
                  </Button>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add New Item Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-add-new-item"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Add New Item
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            {imagePreview ? (
              <Box 
                component="img" 
                src={imagePreview} 
                alt="Product preview" 
                sx={{ height: 150, width: 150, objectFit: 'contain' }}
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
                  Upload Image
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-image-button"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="upload-image-button">
                  <Button 
                    component="span" 
                    variant="outlined" 
                    size="small"
                    sx={{ mt: 1, borderColor: '#ddd', color: '#888' }}
                  >
                    Browse
                  </Button>
                </label>
              </Box>
            )}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                size="small"
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                size="small"
                type="number"
                InputProps={{
                  startAdornment: <Box component="span" sx={{ mr: 0.5 }}>$</Box>
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button 
                  onClick={handleCloseModal} 
                  variant="outlined"
                  sx={{ width: '48%', borderColor: '#ddd', color: '#333' }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  variant="contained" 
                  sx={{ 
                    width: '48%', 
                    bgcolor: 'error.main', 
                    '&:hover': { bgcolor: 'error.dark' }
                  }}
                >
                  Save
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
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}