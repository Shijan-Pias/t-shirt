import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const UseAxiosSecure = () => {
    // ১. user এবং logOut আনুন
    const { user, logOut } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        // ২. রিকোয়েস্ট ইন্টারসেপ্টর
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            
            // --- CHANGE HERE: LocalStorage বাদ দিয়ে User থেকে টোকেন নেওয়া ---
            const token = user?.accessToken; 

            // যদি ইউজার এবং টোকেন থাকে, তবেই হেডার সেট করো
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // ৩. রেসপন্স ইন্টারসেপ্টর (Error Handling)
        const responseInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const status = error.response ? error.response.status : null;
            
            console.log("Interceptor Error Status:", status);

            // 401 বা 403 হলে লগআউট
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

    }, [user, logOut, navigate]); // dependency তে user যোগ করতে হবে

    return axiosSecure;
};

export default UseAxiosSecure;