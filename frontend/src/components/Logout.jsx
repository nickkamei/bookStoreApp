import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Logout() {
    const [, setAuthUser] = useAuth(); // Get setAuthUser from AuthProvider
    const navigate = useNavigate(); // For redirection

    const handleLogout = () => {
        setAuthUser(null); // Clear authUser state
        toast.success('Logout successful');
        navigate('/'); // Redirect to home page
    };

    return (
        <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 duration-300" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;