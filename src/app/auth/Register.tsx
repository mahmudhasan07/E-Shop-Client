'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { createUser } from '../Components/Redux/ReduxFuncation';
import { AppDispatch } from '../Components/Redux/store';

const Register = () => {

    interface IInfo {
        email: string,
        password: string,
        name: string,
        photo: string
    }

    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState("password")
    const dispatch = useDispatch<AppDispatch>()
    const handleRegistration = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        setLoading(true)
        const inputs = e.target as typeof e.target & {
            name: { value: string }
            email: { value: string }
            photo: { files: FileList }
            password: { value: string }
        }
        const name: string = inputs.name.value
        const email: string = inputs.email.value
        const image: File = inputs.photo.files[0]
        const password: string = inputs.password.value
        if (email && password) {
            const fromData = new FormData()
            fromData.append("file", image)
            fromData.append("upload_preset", 'gym-site')
            axios.post('https://api.cloudinary.com/v1_1/daudgshta/upload', fromData)
                .then(res => {
                    console.log(res);
                    if (res.data) {
                        const photo = res.data.secure_url
                        const userInfo: IInfo = { email, password, name, photo }
                        dispatch(createUser({ userInfo }))
                            .then(res => {
                                console.log(res);
                                setLoading(false)
                            })

                    }
                }
                )
        }
    }

    return (
        <section className='relative'>
            {
                loading == true ?
                    <div className=' w-full h-full z-50 backdrop-blur-sm absolute'>
                        <div className='top-1/4 absolute left-[48%]'>
                            {/* <Loader></Loader> */}
                        </div>
                    </div>
                    :
                    ""
            }
            <form onSubmit={handleRegistration} action="" className='space-y-4'>
                <div >
                    <label className='text-xl font-semibold'>Name:</label> <br />
                    <input name='name' type="text" className='border-2 p-1 rounded-lg border-gray-600 w-96' />
                </div>
                <div >
                    <label className='text-xl font-semibold' >Email:</label> <br />
                    <input name='email' type="text" className='border-2 p-1 rounded-lg border-gray-600 w-96' />
                </div>
                <div >
                    <label className='text-xl font-semibold' >Upload Image:</label> <br />
                    <input name='photo' type="file" className='border-2 p-1 rounded-lg border-gray-600 w-96' />
                </div>
                <div className='relative'>
                    <label className='text-xl font-semibold' >Password:</label> <br />
                    <input name='password' type={pass} className='border-2 p-1 rounded-lg border-gray-600 w-96' />
                    <div className='absolute top-9 right-2 text-xl'>
                        {
                            pass == 'password' ?
                                <IoEye className='cursor-pointer' onClick={() => setPass('text')} />
                                :
                                <IoEyeOff className='cursor-pointer' onClick={() => setPass('password')} />
                        }
                    </div>
                </div>
                <div className='text-center'>
                    <button className='border-2 px-3 py-2 w-32 text-lg font-bold bg-blue-600 text-white rounded-lg'>Registration</button>
                </div>
                <div className='text-end'>
                    <Link href={'/'}> <button className='text-lg text-blue-700 font-bold '>Back to Home</button></Link>
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default Register;