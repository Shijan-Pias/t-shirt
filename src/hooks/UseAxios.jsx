import axios from 'axios';
import React from 'react';

const useAxios = axios.create({
    baseURL: `http://localhost:5000/`
})

const UseAxios = () => {
    return useAxios;
};

export default UseAxios;