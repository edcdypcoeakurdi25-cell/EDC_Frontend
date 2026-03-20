import { motion } from 'framer-motion';
import { Briefcase, MapPin, Users } from 'lucide-react';

const item = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const OpeningCard = ({ opening, onViewRole }) => {
    return (
        <motion.div
            variants={item}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-zinc-900 border border-white/5 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-white/10 hover:bg-zinc-800/50"
        >
            <div>
                <h3 className="text-lg font-semibold mb-2">{opening.title}</h3>

                <div className="flex flex-wrap gap-5 text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                        <Briefcase size={16} />
                        {opening.department}
                    </span>

                    <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {opening.location}
                    </span>

                    <span className="flex items-center gap-2">
                        <Users size={16} />
                        {opening.applicants} applicants
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
                <button
                    className="text-blue-400 hover:text-blue-300 font-medium"
                    onClick={() => onViewRole(opening.id)}
                >
                    View Role
                </button>

                <button className="text-red-400 hover:text-red-300 font-medium">Delete</button>
            </div>
        </motion.div>
    );
};

export default OpeningCard;
