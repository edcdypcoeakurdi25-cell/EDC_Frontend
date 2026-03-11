import { motion } from 'framer-motion';

const item = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

export default function OpeningTextarea({ label, name, value, onChange }) {
    return (
        <motion.div variants={item} className="mb-8">
            <label className="block text-zinc-200 font-medium text-sm mb-3">{label}</label>

            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-white/3 border border-white/5 rounded-lg p-4 text-zinc-200 text-sm min-h-35 focus:outline-none focus:ring-1 focus:ring-white/10 transition"
            />
        </motion.div>
    );
}
