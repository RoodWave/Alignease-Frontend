import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/auth",
});

const authService = {
    // Sign In
    signIn: async (userDTO) => {
        try {
            const response = await axiosInstance.post('/login', userDTO);
            return response.data;
        } catch (error) {
            console.error("Error on sign-in", error);
            throw error;
        }
    },

    // Sign Up
    signUp: async (userDTO) => {
        try {
            const response = await axiosInstance.post('/signup', userDTO);
            return response.data;
        } catch (error) {
            console.error("Error on sign-up", error);
            throw error;
        }
    },
};

export default authService;