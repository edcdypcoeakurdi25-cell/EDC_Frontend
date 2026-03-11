import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function OpeningFormActions({ onClear, onNext }) {
    return (
        <motion.div className="flex justify-between items-center mt-12 pt-4">
            <button
                onClick={onClear}
                className="px-10 py-2.5 rounded-lg border border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white transition text-sm font-medium cursor-pointer"
            >
                Clear
            </button>

            <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="flex items-center gap-2 px-10 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition text-sm font-semibold cursor-pointer"
            >
                Next
                <ArrowRight size={16} />
            </motion.button>
        </motion.div>
    );
}
