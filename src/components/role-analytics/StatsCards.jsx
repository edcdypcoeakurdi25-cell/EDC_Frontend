import { motion } from 'framer-motion';

export default function StatsCards({ stats }) {
    if (!stats) return null;
    return (
        <div className="flex flex-col md:flex-row gap-10 mb-15">
            <StatCard title="Number of Applicants" value={stats.totalApplications || 0} color="green" />

            <StatCard title="Number of Views" value={stats.views || 0} subtitle="In last 1 month" />
        </div>
    );
}

function StatCard({ title, value, subtitle, color }) {
    const base =
        'w-60 rounded-xl border border-neutral-400 p-8 flex flex-col items-center justify-center';

    const styles =
        color === 'green' ? 'bg-green-400 text-black' : 'bg-neutral-800 text-neutral-300';

    return (
        <motion.div whileHover={{ scale: 1.03 }} className={`${base} ${styles}`}>
            <p className="text-sm font-medium text-center mb-2">{title}</p>
            <p className="text-7xl font-bold">{value}</p>
            {subtitle && <p className="text-xs font-semibold text-neutral-500 mt-2">{subtitle}</p>}
        </motion.div>
    );
}
