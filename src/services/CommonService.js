import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
});

const commonService = {
    
    getProductImage: async (imageId) => {
        try {
            const response = await axiosInstance.get(`product-images/${imageId}`, {
                responseType: 'blob', // ⬅️ This is important!
            });
            console.log({response});
            
    
            // Convert the blob to a URL
            const imageUrl = URL.createObjectURL(response.data);
            return imageUrl;
    
        } catch (error) {
            console.error("Error retrieving image", error);
            throw error;
        }
    }
    

};

export default commonService;