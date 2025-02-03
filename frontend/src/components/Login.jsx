import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Logs the form data when submitted
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Close button */}
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </Link>
            <h3 className="font-bold text-lg">Login</h3>
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
                Login
              </button>
              <p>
                Not Registered?{' '}
                <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
