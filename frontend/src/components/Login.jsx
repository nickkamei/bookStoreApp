import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

function Login({ onLoginSuccess, from }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [, setAuthUser] = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:4001/user/login', {
                email: data.email,
                password: data.password,
            });

            if (response.data.user) {
                setAuthUser(response.data.user); // Update authUser state
                toast.success('Login Successful');

                // Close the login modal
                if (typeof onLoginSuccess === 'function') {
                    onLoginSuccess();
                }

                // Redirect to the intended page or home page
                navigate(from || '/'); // Use the `from` prop for redirection
            }
        } catch (err) {
            if (err.response) {
                toast.error('Error: ' + err.response.data.message);
            }
        }
    };

    // Handle close button with safety check
    const handleClose = () => {
        console.log('Exit button clicked'); // Debugging
        if (typeof onLoginSuccess === 'function') {
            onLoginSuccess();
        } else {
            console.warn('onLoginSuccess is not a function or not provided');
            // Fallback behavior - could navigate to home or do something else
            navigate('/');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md mx-4 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg relative">
                {/* Exit (X) Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                >
                    ✕
                </button>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg text-center dark:text-white">Login</h3>
                    <div className="mt-4 space-y-2">
                        <span className="dark:text-white">Email</span>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:bg-slate-700 dark:text-white"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                    </div>
                    <div className="mt-4 space-y-2">
                        <span className="dark:text-white">Password</span>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:bg-slate-700 dark:text-white"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <span className="text-sm text-red-500">This field is required</span>}
                    </div>
                    <div className="flex justify-around mt-5">
                        <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                            Login
                        </button>
                        <p className="text-xl dark:text-white">
                            Don't have an account?{' '}
                            <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;