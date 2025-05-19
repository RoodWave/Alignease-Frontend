import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/product",
});

const productService = {
    
    addProduct: async (productDTO) => {
        try {
            const response = await axiosInstance.post('/add', productDTO);
            return response.data;
        } catch (error) {
            console.error("Error on Adding", error);
            throw error;
        }
    },
    bookProduct: async (productDTO) => {
        try {
            const response = await axiosInstance.post('/book', productDTO);
            return response.data;
        } catch (error) {
            console.error("Error on booking", error);
            throw error;
        }
    },
    updateProduct: async (productDTO,id) => {
        try {
            const response = await axiosInstance.post(`/update/${id}`, productDTO);
            return response.data;
        } catch (error) {
            console.error("Error on updating", error);
            throw error;
        }
    },
    deleteProduct: async (id) => {
        try {
            const response = await axiosInstance.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error on deleting", error);
            throw error;
        }
    },
    getAllProduct: async () => {
        try {
            const response = await axiosInstance.get('/list');
            return response.data;
        } catch (error) {
            console.error("Error on retreiving", error);
            throw error;
        }
    },

};

export default productService;