import React from 'react';
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AdminSidebar from '../components/AdminSidebar.jsx';

const AdminLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AdminSidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default AdminLayout;
