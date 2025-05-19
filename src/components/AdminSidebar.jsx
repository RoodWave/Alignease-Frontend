import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const AdminSidebar = () => {
    const menuItems = [
        { text: 'Bookings', path: '/admin/bookings' },
        { text: 'Inventory', path: '/admin/inventory' },
        { text: 'Issue Reporting', path: '/admin/issues' },
        { text: 'Customer Feedback', path: '/admin/feedback' },
        { text: 'Services', path: '/admin/services' },
        { text: 'Logout', path: '/login' },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                width: 250,
                height: '100vh',
                backgroundColor: 'black',
                borderRadius: 0,
            }}
        >
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center',width:250}}>
                <Box component='img' src={Logo} height={85}  />
            </Box>

            <List sx={{ p: 2 }}>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.text}
                        component={NavLink}
                        to={item.path}
                        onClick={()=>localStorage.clear()}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            textDecoration: 'none',
                            '&.active': {
                                backgroundColor: '#e50914',
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                        }}
                    >
                        <ListItemText
                            primary={item.text}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    color: '#fff',
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default AdminSidebar;
