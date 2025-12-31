import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

// বেস URL ঠিক আছে
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const UseAxiosSecure = () => {
    
    const { logOut } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        // ১. রিকোয়েস্ট ইন্টারসেপ্টর (Token পাঠানো)
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            // User অবজেক্টের বদলে LocalStorage থেকে টোকেন নেওয়া বেশি নিরাপদ
            const token = localStorage.getItem('access-token');
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

    }, [logOut, navigate]);

    return axiosSecure;
};

export default UseAxiosSecure;