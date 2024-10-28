import axios, { AxiosInstance } from 'axios';


export const axiosSource : AxiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

const getAxios = () : AxiosInstance => {
    return axiosSource
};

export default getAxios;