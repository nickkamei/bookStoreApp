import React, { useEffect, useState } from 'react'
import Cards from './cards'
import { Link } from 'react-router-dom'
import axios from "axios"


const Course = () => {
    const [book,setBook]=useState([])
    useEffect(() =>{
        const getBook = async()=>{
            try {
                const res = await axios.get("http://localhost:4001/book");
                console.log(res.data)
                setBook(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBook();
    },
[]);
  return (
    <>
    <div className='max-w-screen-2x1 container mx-auto md:px-20 px-4'>
        <div className='mt-28 items-center justify-center text-center'>
            <h1 className=' text-2xl font-semibold md:text-4xl'>We're delighted to have you <span className='text-pink-500'>here! :)</span></h1>
            <p className='mt-7'>
            Discover a world of knowledge, imagination, and inspiration. Whether you're here to find your next great read, explore our curated courses, or claim your free book, we've got something for everyone. Dive in and let your journey begin! 📚✨
            </p>
            <Link to="/">
            <button className='mt-5 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>
            </Link>
        </div>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2'>
            {
                book.map(item=>(
                    <Cards key={item.id} item={item} />
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Course
