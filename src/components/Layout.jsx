import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='flex items-start'>
            <Sidebar />
            <main className='flex flex-1 items-center justify-center h-full min-h-screen px-4 py-2 bg-zinc-900 text-white'>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
