import HomePage from './pages/Home';
import MainLayout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewOpeningForm from './pages/release-openings/NewOpeningForm';
import ReleaseOpeningsPage from './pages/release-openings/ReleaseOpenings';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/release-openings" element={<ReleaseOpeningsPage />} />
                    <Route path="/release-opening-form" element={<NewOpeningForm />} />
                    <Route path="/opening-form-details" element={<>Opening form details</>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
