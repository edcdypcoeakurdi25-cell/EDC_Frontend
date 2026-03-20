import { motion } from 'framer-motion';
import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AnalyticsHeader from './AnalyticsHeader';
import RoleInfo from './RoleInfo';
import StatsCards from './StatsCards';
import AnalyticsTabs from './AnalyticsTabs';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function RoleAnalyticsLayout() {
    const { id } = useParams();
    const [opening, setOpening] = useState(null);
    const [stats, setStats] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!id) return;
            try {
                const statsRes = await fetch(`${import.meta.env.VITE_API_URL}/openings/${id}/stats`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
                });
                const statsData = await statsRes.json();
                
                const detailRes = await fetch(`${import.meta.env.VITE_API_URL}/openings/${id}/details`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
                });
                const detailData = await detailRes.json();

                const appRes = await fetch(`${import.meta.env.VITE_API_URL}/applications/opening/${id}?limit=100`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
                });
                const appData = await appRes.json();

                if (statsData.success && detailData.success) {
                    setStats(statsData.data);
                    setOpening(detailData.data.opening);
                    if (appData.success) {
                        setApplications(appData.data.applications || []);
                    }
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

        fetchAnalytics();
    }, [id]);

    if (loading) return <div className="p-12 text-white">Loading Analytics Data...</div>;
    if (error || !opening) return <div className="p-12 text-red-500">Failed to load analytics data.</div>;

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 mt-6 px-12 pb-10">
            <motion.div variants={item}>
                <AnalyticsHeader title={`${opening.title} Analytics`} />
            </motion.div>

            <motion.div variants={item}>
                <RoleInfo opening={opening} />
            </motion.div>

            <motion.div variants={item}>
                <StatsCards stats={stats} />
            </motion.div>

            <motion.div variants={item}>
                <AnalyticsTabs />
            </motion.div>

            {/* Nested pages render here */}
            <motion.div variants={item}>
                <Outlet context={{ opening, stats, applications }} />
            </motion.div>
        </motion.div>
    );
}
