import React from 'react';
import HomePage from './pages/Home';
import MainLayout from './components/Layout';
import ReleaseOpeningPage from './pages/ReleaseOpening';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/release-opening" element={<ReleaseOpeningPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
