import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar component
import Footer from './Footer'; // Import Footer component

const SearchResults = () => {
    const [books, setBooks] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:4001/books/search?q=${query}`)
                .then(response => {
                    console.log('Search results:', response.data); // Log the search results
                    setBooks(response.data);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error); // Log any errors
                });
        }
    }, [query]);

    // Function to handle exit (navigate back to home)
    const handleExit = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col dark:bg-slate-900 dark:text-white">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex-grow p-4">
                <div className="container mx-auto">
                    {/* Exit Button */}
                    <button
                        onClick={handleExit}
                        className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                        Exit
                    </button>

                    {/* Search Results */}
                    <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
                    {books.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {books.map(book => (
                                <div key={book._id} className="border p-4 rounded-lg shadow-md dark:bg-slate-800">
                                    <h2 className="text-xl font-semibold">{book.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{book.title}</p>
                                    <img src={book.image} alt={book.name} className="mt-2 w-full h-48 object-cover" />
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Category: {book.category}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        Price: ${book.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No books found.</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SearchResults;