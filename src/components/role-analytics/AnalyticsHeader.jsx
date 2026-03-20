import { GoGraph } from 'react-icons/go';

export default function AnalyticsHeader({ title = 'Role Analytics' }) {
    return (
        <div className="flex items-center gap-3 mb-10">
            <GoGraph className="text-green-400 text-3xl" />
            <h2 className="text-green-400 text-3xl font-semibold">{title}</h2>
        </div>
    );
}
