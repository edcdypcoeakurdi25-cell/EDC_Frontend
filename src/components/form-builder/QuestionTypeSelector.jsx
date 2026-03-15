import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const INPUT_TYPES = [
    { value: 'short', label: 'Short Answer' },
    { value: 'long', label: 'Long Answer' },
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'upload', label: 'File Upload' },
];

export default function QuestionTypeSelector({ value, onChange }) {
    const [open, setOpen] = useState(false);

    const selected = INPUT_TYPES.find(t => t.value === value);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 flex justify-between items-center text-sm"
            >
                {selected.label}
                <ChevronDown size={14} />
            </button>

            {open && (
                <div className="absolute mt-2 w-full bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
                    {INPUT_TYPES.map(type => (
                        <button
                            key={type.value}
                            onClick={() => {
                                onChange(type.value);
                                setOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-800"
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
