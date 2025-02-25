import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        };
        
        await axios.post("http://localhost:4001/user/signup", userInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    localStorage.setItem("Users", JSON.stringify(res.data.user));
                    toast.success('Signup Successfully');
                }
            }).catch((err) => {
                if (err.response) {
                    toast.error("Error: " + err.response.data.message);
                }
            });
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-[600px]">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </Link>
                        <h3 className="font-bold text-lg">Signup</h3>
                        <div className="mt-4 space-y-2">
                            <span>Username</span>
                            <input
                                type="text"
                                placeholder="Enter your FullName"
                                className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:text-black"
                                {...register('fullname', { required: true })}
                            />
                            {errors.fullname && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>
                        <div className="mt-4 space-y-2">
                            <span>Email</span>
                            <input
                                type="email"
                                placeholder="Enter your Email"
                                className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:text-black"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>
                        <div className="mt-4 space-y-2">
                            <span>Password</span>
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:text-black"
                                {...register('password', { required: true })}
                            />
                            {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>
                        <div className="flex justify-around mt-5">
                            <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                                SignUp
                            </button>
                            <p className="text-xl">
                                Have an account? 
                                <Link to="/login" className="underline text-blue-500 cursor-pointer">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;