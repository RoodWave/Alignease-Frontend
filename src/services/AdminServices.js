import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/admin",
});

const adminServices = {
    acceptDoctor: async (doctorId, adminId) => {
        const payload = {
            doctorId: doctorId,
            adminId: adminId
        }

        try {
            const response = await axiosInstance.post('/accept', payload);
            return response.data;
        } catch (error) {
            console.error("Error on accepting", error);
            throw error;
        }
    },

    rejectDoctor: async (doctorId, adminId) => {
        const payload = {
            doctorId: doctorId,
            adminId: adminId
        }
        try {
            const response = await axiosInstance.post('/reject', payload);
            return response.data;
        } catch (error) {
            console.error("Error on accepting", error);
            throw error;
        }
    }
}

export default adminServices;