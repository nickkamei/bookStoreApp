import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/Home';
import Courses from './courses/Courses';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './About/About';
import Contact from './components/Contact';
import SearchResults from './components/SearchResults'; // Import SearchResults
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';

const App = () => {
    const [authUser] = useAuth();
    return (
        <div className="dark:bg-slate-900 dark:text-white">
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/aboutus" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/search" element={<SearchResults />} /> {/* Add SearchResults route */}
            </Routes>
        </div>
    );
};

export default App;