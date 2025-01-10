import { isTokenExpired } from "@/lib/utils";
import axios from "axios";

// Axios instance setup
const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 60000,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';



// Separate instance for refreshing tokens
export const refreshInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 60000,
});



// Refresh access token
 const refreshAccessToken =async () : Promise<string|null> => {
try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        return null;
    }

    const response = await refreshInstance.post('/auth//refresh-token', {
        refreshToken,
    });

    const accessToken  = response?.data?.data?.accessToken;

    localStorage.setItem('accessToken', accessToken);

    return accessToken;
    
} catch (error) {
   console.log("Error in refreshAccessToken",error)
    return null 
}
 }




instance.interceptors.request.use(
    async (config) => {

        let accessToken = localStorage.getItem('accessToken');

        if (accessToken && isTokenExpired(accessToken)) {
            accessToken = await refreshAccessToken();}


        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
);
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { instance };