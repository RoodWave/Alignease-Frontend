import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import theme from "./theme.js";
import Home from "./pages/Home.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Services from "./pages/Services.jsx";
import TireOrdering from "./pages/TireOrdering.jsx";
import Wheelbalancing from "./pages/WheelBalancing.jsx";
import NitrogenFilling from "./pages/NitrogenFilling.jsx";
import PartReplacement from "./pages/PartReplacement.jsx";
import TirePatching from "./pages/TirePatching.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import IssueReport from "./pages/IssueReport.jsx";
import MyActivity from "./pages/MyActivity.jsx";
import Bookings from "./pages/Bookings.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import IssueReporting from "./pages/IssueReporting.jsx";
import CustomerFeedback from "./pages/CustomerFeedback.jsx";
import Inventory from "./pages/Inventory.jsx";

function App() {

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="services" element={<Services />} />
                            <Route path="contact-us" element={<ContactUs />} />
                            <Route path="about-us" element={<AboutUs />} />
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="report" element={<IssueReport />} />
                            <Route path="activity" element={<MyActivity />} />
                            <Route path="/services">
                                <Route path="tire-ordering" element={<TireOrdering />} />
                                <Route path="wheel-balancing" element={<Wheelbalancing />} />
                                <Route path="nitrogen-filling" element={<NitrogenFilling />} />
                                <Route path="tire-patching" element={<TirePatching />} />
                                <Route path="part-replacement" element={<PartReplacement />} />
                            </Route>
                        </Route>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="bookings" element={<Bookings />} />
                            <Route path="issues" element={<IssueReporting />} />
                            <Route path="feedback" element={<CustomerFeedback />} />
                            <Route path="inventory" element={<Inventory />} />
                            <Route path="part-replacement" element={<PartReplacement />} />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ToastContainer position="bottom-right" stacked />
        </>
    )
}

export default App
