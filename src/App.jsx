import HomePage from './pages/Home';
import MainLayout from './layouts/MainLayout';
import SummaryPage from './pages/role-analytics/SummaryPage';
import QuestionPage from './pages/role-analytics/QuestionPage';
import IndividualPage from './pages/role-analytics/IndividualPage';
import NewOpeningForm from './pages/release-openings/NewOpeningForm';
import { OpeningBuilderProvider } from './context/OpeningBuilderContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ReleaseOpeningsPage from './pages/release-openings/ReleaseOpenings';
import OpeningDetailsForm from './pages/release-openings/DetailedOpeningForm';
import RoleAnalyticsLayout from './components/role-analytics/RoleAnalyticsLayout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/release-openings" element={<ReleaseOpeningsPage />} />
                    <Route
                        path="/create-opening"
                        element={
                            <OpeningBuilderProvider>
                                <NewOpeningForm />
                            </OpeningBuilderProvider>
                        }
                    />
                    <Route
                        path="/create-opening/form-builder"
                        element={
                            <OpeningBuilderProvider>
                                <OpeningDetailsForm />
                            </OpeningBuilderProvider>
                        }
                    />
                    <Route path="/role-analytics" element={<RoleAnalyticsLayout />}>
                        <Route index element={<Navigate to="summary" replace />} />
                        <Route path="summary" element={<SummaryPage />} />
                        <Route path="question" element={<QuestionPage />} />
                        <Route path="individual" element={<IndividualPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
