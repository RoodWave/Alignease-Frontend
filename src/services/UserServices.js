import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/user",
});

const userService = {
    // Sign In
    signIn: async (userDTO) => {
        const apiRequest = {
            userDTO
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/sign-in', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on sign-in", error);
            throw error;
        }
    },

    // Sign Up
    signUp: async (userDTO) => {
        try {
            const response = await axiosInstance.post('/sign-up', userDTO);
            return response.data;
        } catch (error) {
            console.error("Error on sign-up", error);
            throw error;
        }
    },
};

export default userService;