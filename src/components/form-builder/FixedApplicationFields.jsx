import { Lock, Info } from 'lucide-react';

const FIXED_FIELDS = [
    { id: 'name', label: 'Enter your name' },
    { id: 'year', label: 'Choose Year of Study' },
    { id: 'phone', label: 'Enter your Phone Number' },
    { id: 'email', label: 'Enter your Email Address' },
    { id: 'branch', label: 'Select Branch' },
];

export default function FixedApplicantFields() {
    return (
        <div>
            <h2 className="text-zinc-200 font-medium mb-6 text-sm">Applicant Information</h2>

            <div className="grid grid-cols-2 gap-4">
                {FIXED_FIELDS.map(field => (
                    <div key={field.id}>
                        <label className="text-xs text-zinc-400 mb-1 block">{field.label}</label>

                        <div className="relative">
                            <input
                                disabled
                                placeholder="Auto collected"
                                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-500"
                            />

                            <Lock
                                size={12}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500 mt-4">
                <Info size={14} />
                These fields are collected automatically and cannot be edited.
            </div>
        </div>
    );
}
