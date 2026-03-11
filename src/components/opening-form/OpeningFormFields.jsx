import { LayoutTemplate, Eye, Target, ChevronDown } from 'lucide-react';
import OpeningFormRow from './OpeningFormRow';

export default function OpeningFormFields({ formData, handleChange }) {
    return (
        <div className="mb-14">
            <OpeningFormRow icon={LayoutTemplate} label="Domain of the Opening">
                <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-zinc-200"
                />
            </OpeningFormRow>

            <OpeningFormRow icon={Eye} label="Choose Type of Work">
                <div className="relative">
                    <select
                        name="workType"
                        value={formData.workType}
                        onChange={handleChange}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-zinc-300 appearance-none"
                    >
                        <option value="">Choose One</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                    </select>

                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                </div>
            </OpeningFormRow>

            <OpeningFormRow icon={Target} label="Number of Openings">
                <input
                    type="number"
                    name="openings"
                    value={formData.openings}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-zinc-200"
                />
            </OpeningFormRow>
        </div>
    );
}
