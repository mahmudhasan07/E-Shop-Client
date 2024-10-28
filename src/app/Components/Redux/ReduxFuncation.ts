import { createAsyncThunk } 
from "@reduxjs/toolkit";
import getAxios from "../Hooks/getAxios";

const axiosLink  = getAxios()
interface ICreateUser {
    name: string;
    email: string;
    photo: string
    password: string
}


const createUser = createAsyncThunk(
    "users/createUser",
    async ({ userInfo }: { userInfo: ICreateUser }) => {
        try {
            const res = await axiosLink.post('/user/create', userInfo)
            return res.data;
        } catch (error) {
            throw error
        }
    }
)



export { createUser }