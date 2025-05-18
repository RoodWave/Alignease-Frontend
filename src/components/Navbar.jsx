import React, {useState, useRef, useEffect} from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material';
import {Link, useLocation, useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// Assume Logo is imported correctly from your assets
import Logo from '../assets/footer/Logo1.png';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    // Check if user is logged in
    const userName = localStorage.getItem("userName");
    console.log({userName});
    
    const isLoggedIn = !!userName;

    // User dropdown menu handlers
    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("userName");
        // Add any other logout logic here
        navigate("/");
        handleUserMenuClose();
    };

    const menuItems = [
        {label: "HOME", to: "/"},
        {label: "SERVICES", to: "/services"},
        {label: "BOOKINGS", to: "/bookings"},
        {label: "ABOUT US", to: "/about-us"},
        {label: "CONTACT US", to: "/contact-us"},
    ];

    const userMenuItems = [
        {label: "My Profile", icon: <PersonIcon />, onClick: () => navigate("/profile")},
        {label: "My Activity", icon: <GridViewIcon />, onClick: () => navigate("/activity")},
        {label: "Issue Report", icon: <DescriptionIcon />, onClick: () => navigate("/report")},
        {label: "Log Out", icon: <LogoutIcon />, onClick: handleLogout},
    ];

    const drawerList = () => (
        <Box
            sx={{width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor:"#000000"}}
            role="presentation"
        >
            <List>
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem
                            button
                            onClick={() => {
                                navigate(item.to);
                                setDrawerOpen(false);
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                sx={{
                                    color: "black",
                                    '& .MuiTypography-root': {
                                        position: 'relative',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: -2,
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: 'black',
                                            transform: location.pathname === item.to ? 'scaleX(1)' : 'scaleX(0)',
                                            transition: 'transform 0.3s ease-in-out'
                                        }
                                    }
                                }}
                            />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar elevation={0} sx={{zIndex: 2, backgroundColor: '#000000'}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Box component="img" src={Logo} alt="Logo" sx={{width: 180, height: 60, marginLeft: {sm: 5}}}/>
                <Box
                    sx={{
                        display: {xs: "none", md: "flex"},
                        justifyContent: "right",
                        flexGrow: 1,
                        gap: {lg: 5, sm: 2, xs: 1},
                        mr: 15
                    }}
                >
                    {menuItems.map((item, index) => (
                        <React.Fragment key={index}>
                            <Button
                                color="inherit"
                                onClick={() => navigate(item.to)}
                                component={Link}
                                to={item.to}
                                sx={{
                                    color: "white",
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '40%',
                                        height: '4px',
                                        borderRadius: 5,
                                        backgroundColor: '#DB002B',
                                        transform: location.pathname === item.to ? 'scaleX(1)' : 'scaleX(0)',
                                        transition: 'transform 0.3s ease-in-out'
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                <Typography sx={{fontWeight: 600, fontSize: 16, fontFamily: 'Poppins, sans-serif',}}>
                                    {item.label}
                                </Typography>
                            </Button>
                        </React.Fragment>
                    ))}
                </Box>
                
                {/* Conditionally render user dropdown or login/signup buttons */}
                {isLoggedIn ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            onClick={handleUserMenuOpen}
                            sx={{
                                color: 'white',
                                textTransform: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                }
                            }}
                            endIcon={userMenuAnchor ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box 
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: 'gray.500',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 1
                                    }}
                                >
                                    <PersonIcon fontSize="small" />
                                </Box>
                                <Typography>{userName}</Typography>
                            </Box>
                        </Button>
                        <Menu
                            anchorEl={userMenuAnchor}
                            open={Boolean(userMenuAnchor)}
                            onClose={handleUserMenuClose}
                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    width: 220,
                                    borderRadius: 1,
                                }
                            }}
                        >
                            {userMenuItems.map((item, index) => (
                                <MenuItem 
                                    key={index} 
                                    onClick={() => {
                                        item.onClick();
                                        handleUserMenuClose();
                                    }}
                                    sx={{
                                        py: 1.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}
                                >
                                    {item.icon}
                                    <Typography>{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                ) : (
                    <Box sx={{display: 'flex', gap: 1}}>
                        <Button 
                            variant='outlined'
                            sx={{
                                backgroundColor: 'black', 
                                borderColor: 'white', 
                                color: 'white', 
                                borderRadius: 2
                            }} 
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{
                                borderRadius: 2, 
                                backgroundColor:"#DB002B"
                            }} 
                            onClick={() => navigate("/sign-up")}
                        >
                            Sign Up
                        </Button>
                    </Box>
                )}
            </Toolbar>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList()}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;