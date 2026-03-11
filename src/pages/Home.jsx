import React from 'react';
import { Link } from 'react-router-dom';
import { CirclePlusIcon } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center">
            <div className='font-bold text-5xl'>
                <p className="leading-16">Welcome Sunny,</p>
                <p className="leading-16">Let's see what you have on </p>
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
