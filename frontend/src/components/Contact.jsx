import React from 'react';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Use the useNavigate hook

  const onSubmit = (data) => {
    console.log(data); // Logs the form data when submitted
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </Link>

              <h3 className="font-bold text-lg">Contact Us</h3>
              <div className="mt-4 space-y-2">
                <span>Username</span>
                <input
                  type="text"
                  placeholder="Enter your FullName"
                  className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:text-black"
                  {...register('name', { required: true })}
                />
                {errors.name && <span className="text-sm text-red-500">This field is required</span>}
              </div>
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:text-black"
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="text-sm text-red-500">This field is required</span>}
              </div>
              <div className="mt-4 space-y-2">
                <span>Message</span>
                <input
                  type="text"
                  placeholder="Type your message"
                  className="input py-1 input-bordered border-outline-white w-full max-w border-rounded-md dark:text-black"
                  {...register('message', { required: true })}
                />
                {errors.message && <span className="text-sm text-red-500">This field is required</span>}
              </div>
              <div className="flex justify-around mt-5">
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
