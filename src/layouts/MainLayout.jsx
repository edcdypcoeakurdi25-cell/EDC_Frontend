import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const MainLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-5 bg-zinc-900 text-white">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
