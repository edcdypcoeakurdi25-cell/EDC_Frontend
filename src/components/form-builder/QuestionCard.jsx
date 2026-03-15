import { motion } from 'framer-motion';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, Trash2 } from 'lucide-react';
import { useOpeningBuilder } from '../../hooks/useOpeningBuilderContext';

export default function QuestionCard({ question, overlay = false }) {
    const { setQuestions } = useOpeningBuilder();

    /* eslint-disable react-hooks/rules-of-hooks */
    const sortable = !overlay ? useSortable({ id: question.id }) : {};

    const { attributes, listeners, setNodeRef, transform, transition, isOver } = sortable;

    const style = overlay
        ? {}
        : {
              transform: CSS.Transform.toString(transform),
              transition,
          };

    const removeField = id => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    return (
        <motion.div
            data-id={question.id}
            ref={!overlay ? setNodeRef : undefined}
            style={style}
            layout={!overlay}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ layout: { duration: 0.25 } }}
            className={`relative bg-zinc-800 border border-white/10 rounded-xl px-4 py-3 flex gap-3
            ${overlay ? 'shadow-2xl scale-105 cursor-grabbing' : ''}
            `}
        >
            {/* Drop indicator */}
            {isOver && !overlay && (
                <div className="absolute -top-2 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}

            {/* Drag Handle */}
            <div
                {...(!overlay ? attributes : {})}
                {...(!overlay ? listeners : {})}
                className="flex items-start pt-1 cursor-grab active:cursor-grabbing"
            >
                <GripVertical size={16} className="text-zinc-500" />
            </div>

            {/* Content */}
            <div className="flex-1">
                <p className="text-sm text-white flex items-center gap-2">
                    {question.title}
                    {question.required && <span className="text-red-400 text-xs">*</span>}
                </p>

                <p className="text-xs text-zinc-500 capitalize mt-1">{question.type}</p>

                {/* MCQ Options */}
                {question.type === 'mcq' && question.options?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {question.options.map(opt => (
                            <span key={opt.id} className="bg-zinc-700 text-xs px-2 py-1 rounded">
                                {opt.label}
                            </span>
                        ))}
                    </div>
                )}

                {/* Upload config */}
                {question.type === 'upload' && (
                    <p className="text-xs text-zinc-500 mt-2">Allowed: {question.config?.type}</p>
                )}
            </div>

            {!overlay && (
                <Trash2
                    size={16}
                    onClick={() => removeField(question.id)}
                    className="text-red-400 cursor-pointer mt-1"
                />
            )}
        </motion.div>
    );
}
