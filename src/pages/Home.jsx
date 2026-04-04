import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { CirclePlusIcon } from 'lucide-react';

const HomePage = () => {

    const navigate = useNavigate();
    let userName = "Admin";
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.name) {
            // Only keep the first name or first word if multiple exist
            userName = user.name.split(" ")[0];
        }
    } catch (e) {
        console.error("Failed to parse user from local storage.");
    }

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

    // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center">

             {/* Logout Button (top right) */}
             
            <div className="w-full flex justify-end p-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                >
                    Logout
                </button>
            </div>

            <div className='font-bold text-5xl'>
                <p className="leading-16">Welcome {userName},</p>
                <p className="leading-16">Let's see what you have on</p>
                <p className="leading-16">plate today...</p>
            </div>
            <Link
                to={'/release-openings'}
                className='mt-16 border border-gray-50/10 rounded-lg px-4 py-2 flex items-center gap-x-2 cursor-pointer hover:bg-white/5 transition-colors duration-200'
            >
                <CirclePlusIcon className='size-4' />
                Create New Opening
            </Link>
        </div>
    );
};

export default HomePage;
