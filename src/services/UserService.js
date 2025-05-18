import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/user/history",
});

const userService = {
    productHistory: async (payload) => {
        try {
            const response = await axiosInstance.post('/product-booking', payload);
            return response.data;
        } catch (error) {
            console.error("Error on sign-in", error);
            throw error;
        }
    },

    servicesHistory: async (payload) => {
        try {
            const response = await axiosInstance.post('/service-booking', payload);
            return response.data;
        } catch (error) {
            console.error("Error on sign-up", error);
            throw error;
        }
    },
};

export default userService;