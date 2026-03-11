import { motion } from 'framer-motion';

const item = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function OpeningFormRow({ icon, label, children }) {
    const Icon = icon;

    return (
        <motion.div variants={item} className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-zinc-200 font-medium text-sm">
                <Icon className="w-4 h-4 text-zinc-400" />
                <span className="text-[16px]">{label}</span>
            </div>

            <div className="w-85">{children}</div>
        </motion.div>
    );
}
