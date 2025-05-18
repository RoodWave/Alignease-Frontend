import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/service",
});

const ourServicesService = {
    
    addServices: async (servicesDTO) => {
        try {
            const response = await axiosInstance.post('/add', servicesDTO);
            return response.data;
        } catch (error) {
            console.error("Error on Adding", error);
            throw error;
        }
    },
    bookServices: async (servicesDTO) => {
        try {
            const response = await axiosInstance.post('/book', servicesDTO);
            return response.data;
        } catch (error) {
            console.error("Error on booking", error);
            throw error;
        }
    },
    updateServices: async (servicesDTO,id) => {
        try {
            const response = await axiosInstance.post(`/update/${id}`, servicesDTO);
            return response.data;
        } catch (error) {
            console.error("Error on updating", error);
            throw error;
        }
    },
    deleteServices: async (id) => {
        try {
            const response = await axiosInstance.delete(`/update/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error on deleting", error);
            throw error;
        }
    },
    getAllServices: async () => {
        try {
            const response = await axiosInstance.get('/list');
            return response.data;
        } catch (error) {
            console.error("Error on retreiving", error);
            throw error;
        }
    },

};

export default ourServicesService;