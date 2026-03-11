import { ArrowLeft, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OpeningFormHeader({
    navigate,
    title,
    setTitle,
    isEditingTitle,
    setIsEditingTitle,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-10"
        >
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition cursor-pointer"
            >
                <ArrowLeft size={16} />
                Go Back
            </button>

            <div className="flex items-center gap-3 text-zinc-400 text-sm">
                {isEditingTitle ? (
                    <input
                        autoFocus
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onBlur={() => setIsEditingTitle(false)}
                        onKeyDown={e => e.key === 'Enter' && setIsEditingTitle(false)}
                        className="bg-zinc-800 border border-white/10 rounded px-2 py-1 text-zinc-200 text-sm"
                    />
                ) : (
                    <span>{title}</span>
                )}

                <button
                    onClick={() => setIsEditingTitle(true)}
                    className="flex items-center gap-1 bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-md hover:bg-zinc-700 transition cursor-pointer"
                >
                    <Pencil size={12} />
                    Edit
                </button>
            </div>
        </motion.div>
    );
}
