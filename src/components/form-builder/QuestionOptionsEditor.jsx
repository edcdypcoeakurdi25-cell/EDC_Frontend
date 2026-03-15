import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function QuestionOptionsEditor({ options, setOptions }) {
    const [option, setOption] = useState('');

    const addOption = () => {
        if (!option.trim()) return;

        setOptions([
            ...options,
            {
                id: crypto.randomUUID(),
                label: option,
            },
        ]);

        setOption('');
    };

    const removeOption = id => {
        setOptions(options.filter(o => o.id !== id));
    };

    return (
        <div className="space-y-3 mt-4">
            {options.map(opt => (
                <div
                    key={opt.id}
                    className="flex items-center justify-between bg-zinc-800 rounded-lg px-3 py-2"
                >
                    <span className="text-sm text-white">{opt.label}</span>

                    <Trash2
                        size={14}
                        onClick={() => removeOption(opt.id)}
                        className="text-red-400 cursor-pointer"
                    />
                </div>
            ))}

            <div className="flex gap-2">
                <input
                    value={option}
                    onChange={e => setOption(e.target.value)}
                    placeholder="Add option"
                    className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm"
                />

                <button
                    onClick={addOption}
                    className="bg-white text-black px-3 rounded-lg flex items-center"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
}
