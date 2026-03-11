import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

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
