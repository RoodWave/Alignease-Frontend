import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { Box } from "@mui/material";

const MainLayout = () => {
    return (
        <>
            <Navbar />
                <Box sx={{ paddingTop: { xs: '60px', md: '64px' } }}>
                    <Outlet />

                </Box>
            <Footer />
        </>
    );
};

export default MainLayout;