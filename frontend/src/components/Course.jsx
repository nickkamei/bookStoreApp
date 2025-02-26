import React, { useEffect, useState } from 'react'
import Cards from './cards'
import { Link } from 'react-router-dom'
import axios from "axios"

const Course = () => {
    const [book, setBook] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getBook = async() => {
            try {
                setLoading(true)
                // Use the full URL to your backend API
                const res = await axios.get("http://localhost:4001/book")
                console.log("API Response:", res.data)
                
                // Check if res.data is an array
                if (Array.isArray(res.data)) {
                    setBook(res.data)
                } else if (res.data && Array.isArray(res.data.books)) {
                    // If data is nested in a 'books' property
                    setBook(res.data.books)
                } else {
                    console.error("API response is not an array:", res.data)
                    setError("Received invalid data format")
                }
            } catch (error) {
                console.error("Error fetching books:", error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getBook()
    }, [])

    if (loading) return <div className="text-center py-10">Loading books...</div>
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>

    return (
        <>
        <div className='max-w-screen-2x1 container mx-auto md:px-20 px-4'>
            <div className='mt-28 items-center justify-center text-center'>
                <h1 className='text-2xl font-semibold md:text-4xl'>We're delighted to have you <span className='text-pink-500'>here! :)</span></h1>
                <p className='mt-7'>
                Discover a world of knowledge, imagination, and inspiration. Whether you're here to find your next great read, explore our curated courses, or claim your free book, we've got something for everyone. Dive in and let your journey begin! 📚✨
                </p>
                <Link to="/">
                <button className='mt-5 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>
                </Link>
            </div>
            <div className='mt-12 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2'>
                {book.length > 0 ? (
                    book.map((item, index) => (
                        <Cards key={item._id || index} item={item} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">No books found</div>
                )}
            </div>
        </div>
        </>
    )
}

export default Course