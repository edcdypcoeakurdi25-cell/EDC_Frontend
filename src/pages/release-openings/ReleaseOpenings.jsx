import React from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { mockOpenings } from '../../lib/data';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/release-opening/EmptyState';
import ErrorState from '../../components/release-opening/ErrorState';
import OpeningList from '../../components/release-opening/OpeningList';
import CreateOpeningCard from '../../components/release-opening/CreateOpeningCard';

const ReleaseOpeningsPage = () => {
    const navigate = useNavigate();

    const [openings, setOpenings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchOpenings = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/openings`);
                const data = await response.json();
                if (data.success) {
                    setOpenings(data.data?.openings || []);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchOpenings();
    }, []);

    const viewRole = (id) => navigate(`/role-analytics/${id}`);
    const createNewOpening = () => navigate('/create-opening');

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-8">
            <div className="max-w-6xl mx-auto py-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">
                    Release Openings
                </h1>

                {/* Create Opening */}
                <div className="mb-12">
                    <h2 className="text-sm tracking-wider text-zinc-400 mb-4">
                        Create New Opening
                    </h2>

                    <CreateOpeningCard onClick={createNewOpening} />
                </div>

                {/* Error State */}
                {error ? (
                    <ErrorState />
                ) : (
                    <div>
                        <h2 className="text-sm tracking-wider text-zinc-400 mb-4">
                            Active Openings
                        </h2>
                        {loading ? (
                            <div className='flex items-center gap-x-2'>
                                <LoaderCircle className='size-4 animate-spin' />
                                <p className='text-sm'>
                                    Loading Openings...
                                </p>
                            </div>
                        ) : openings.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <OpeningList openings={openings} onViewRole={viewRole} />
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ReleaseOpeningsPage;
