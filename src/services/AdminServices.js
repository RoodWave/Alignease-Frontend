import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/admin",
});

const adminServices = {
    approveProductBooking: async (productBookingId) => {

        try {
            const response = await axiosInstance.post(`/product-bookings/${productBookingId}/approve`);
            return response.data;
        } catch (error) {
            console.error("Error on approve product booking", error);
            throw error;
        }
    },

    approveServiceBooking: async (serviceBookingId) => {

        try {
            const response = await axiosInstance.post(`/service-bookings/${serviceBookingId}/approve`);
            return response.data;
        } catch (error) {
            console.error("Error on approve service booking", error);
            throw error;
        }
    },

    rejectProductBooking: async (productBookingId) => {

        try {
            const response = await axiosInstance.post(`/product-bookings/${productBookingId}/reject`);
            return response.data;
        } catch (error) {
            console.error("Error on reject product booking", error);
            throw error;
        }
    },

    rejectServiceBooking: async (serviceBookingId) => {

        try {
            const response = await axiosInstance.post(`/service-bookings/${serviceBookingId}/reject`);
            return response.data;
        } catch (error) {
            console.error("Error on reject service booking", error);
            throw error;
        }
    },

    getAllServiceBookings: async (status) => {
        try {
            const config = {};
            if (status) {
                config.params = {
                    status: status
                };
            }
            const response = await axiosInstance.get('/service-bookings', config);
            return response.data;
        } catch (error) {
            console.error("Error on getAllServiceBookings", error);
            throw error;
        }
    },

    getAllProductBookings: async (status) => {
        try {
            const config = {};
            if (status) {
                config.params = {
                    status: status
                };
            }
            const response = await axiosInstance.get('/product-bookings', config);
            return response.data;
        } catch (error) {
            console.error("Error on getAllProductBookings", error);
            throw error;
        }
    }
}

export default adminServices;