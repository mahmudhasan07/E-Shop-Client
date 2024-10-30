import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "../Hooks/getAxios";
import { AxiosError } from "axios";

const axiosLink = getAxios()
interface ICreateUser {
    name: string;
    email: string;
    photo: string
    password: string
}

interface ResponseInfo {
    response: {
        data: object
    }
}

const createUser = createAsyncThunk(
    "users/createuser",
    async ({ userInfo }: { userInfo: ICreateUser }) => {
        try {
            const res = await axiosLink.post('/user/create', userInfo)
            return res.data;
        } catch (error) {
            console.log(error);
            const errorMessage = error as AxiosError
            throw errorMessage.response?.data;
        }
    }
)


interface IlogIn {
    email: string,
    password: string
}

const logInUser = createAsyncThunk(
    "users/logInUser",
    async ({ email, password }: IlogIn) => {
        try {
            const logInInfo: IlogIn = { email, password }
            const res = await axiosLink.post(`/user/login/${email}`, logInInfo)
            return res?.data
        } catch (error) {
            const err = error as AxiosError
            throw err.response?.data;

        }
    }
)



export { createUser, logInUser }