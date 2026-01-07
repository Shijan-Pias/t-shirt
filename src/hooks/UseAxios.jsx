import axios from 'axios';
import React from 'react';

const useAxios = axios.create({
    baseURL: `https://custom-tshirt-server.vercel.app
    `
})

const UseAxios = () => {
    return useAxios;
};

export default UseAxios;