import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FormBuilderHeader() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center mb-10">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition"
            >
                <ArrowLeft size={16} />
                Go Back
            </button>

            <span className="text-sm text-zinc-400">Application Form Builder</span>
        </div>
    );
}
