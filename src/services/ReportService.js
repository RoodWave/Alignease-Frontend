import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/report",
});

const reportService = {
    addReport: async (payload) => {

        try {
            const response = await axiosInstance.post('/add', payload);
            return response.data;
        } catch (error) {
            console.error("Error on addReport", error);
            throw error;
        }
    },

    getAllReports: async () => {

        try {
            const response = await axiosInstance.get('/list');
            return response.data;
        } catch (error) {
            console.error("Error on getAllReports", error);
            throw error;
        }
    },

    updateReportStatus: async (payload) => {
        try {
            const response = await axiosInstance.put('/status', payload);
            return response.data;
        } catch (error) {
            console.error("Error on updateReportStatus", error);
            throw error;
        }
    }
}

export default reportService;