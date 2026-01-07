import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://custom-tshirt-server.vercel.app'
});

const UseAxiosSecure = () => {
    const { user, logOut } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            
            const token = user?.accessToken; 
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
        const responseInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const status = error.response ? error.response.status : null;
            
            console.log("Interceptor Error Status:", status);

            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default UseAxiosSecure;