import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/review",
});

const reviewService = {
    addProductReview: async (payload) => {

        try {
            const response = await axiosInstance.post('/product', payload);
            return response.data;
        } catch (error) {
            console.error("Error on addProductReview", error);
            throw error;
        }
    },

    addServiceReview: async (payload) => {

        try {
            const response = await axiosInstance.post('/service', payload);
            return response.data;
        } catch (error) {
            console.error("Error on addServiceReview", error);
            throw error;
        }
    },

    getAllReviews: async () => {

        try {
            const response = await axiosInstance.get('/list');
            return response.data;
        } catch (error) {
            console.error("Error on getAllReviews", error);
            throw error;
        }
    },

    updateReviewStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/status', payload);
            return response.data;
        } catch (error) {
            console.error("Error on updateReviewStatus", error);
            throw error;
        }
    }
}

export default reviewService;