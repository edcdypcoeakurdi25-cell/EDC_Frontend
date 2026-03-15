import { useState } from 'react';
import { Plus } from 'lucide-react';
import QuestionTypeSelector from './QuestionTypeSelector';
import QuestionUploadConfig from './QuestionUploadConfig';
import QuestionOptionsEditor from './QuestionOptionsEditor';
import { useOpeningBuilder } from '../../hooks/useOpeningBuilderContext';

export default function QuestionCreator() {
    const { setQuestions } = useOpeningBuilder();

    const [newField, setNewField] = useState({
        title: '',
        type: 'short',
        required: false,
        options: [],
        config: { type: 'any' },
    });

    const addField = () => {
        if (!newField.title.trim()) return;

        setQuestions(prev => [
            ...prev,
            {
                ...newField,
                id: Date.now(),
            },
        ]);

        // Reset properly
        setNewField({
            title: '',
            type: 'short',
            required: false,
            options: [],
            config: { type: 'any' },
        });
    };

    return (
        <div>
            {/* Header with Required Toggle */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-zinc-200 font-medium text-sm">Add New Question</h2>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400">Required</span>

                    <button
                        onClick={() =>
                            setNewField(prev => ({
                                ...prev,
                                required: !prev.required,
                            }))
                        }
                        className={`w-10 h-5 rounded-full relative transition ${
                            newField.required ? 'bg-white' : 'bg-zinc-700'
                        }`}
                    >
                        <div
                            className={`absolute top-0.5 w-4 h-4 bg-black rounded-full transition ${
                                newField.required ? 'left-5' : 'left-1'
                            }`}
                        />
                    </button>
                </div>
            </div>

            <input
                value={newField.title}
                onChange={e =>
                    setNewField(prev => ({
                        ...prev,
                        title: e.target.value,
                    }))
                }
                placeholder="Enter question title"
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm mb-4"
            />

            <QuestionTypeSelector
                value={newField.type}
                onChange={type =>
                    setNewField(prev => ({
                        ...prev,
                        type,
                    }))
                }
            />

            {newField.type === 'mcq' && (
                <QuestionOptionsEditor
                    options={newField.options}
                    setOptions={opts =>
                        setNewField(prev => ({
                            ...prev,
                            options: opts,
                        }))
                    }
                />
            )}

            {newField.type === 'upload' && (
                <QuestionUploadConfig
                    config={newField.config}
                    setConfig={cfg =>
                        setNewField(prev => ({
                            ...prev,
                            config: cfg,
                        }))
                    }
                />
            )}

            <button
                onClick={addField}
                className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition mt-5"
            >
                <Plus size={16} />
                Add Question
            </button>
        </div>
    );
}
