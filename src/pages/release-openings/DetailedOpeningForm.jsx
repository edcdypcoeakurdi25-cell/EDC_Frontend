import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Save } from 'lucide-react';

import QuestionList from '../../components/form-builder/QuestionList';
import QuestionCreator from '../../components/form-builder/QuestionCreator';
import FormPreviewModal from '../../components/form-builder/FormPreviewModal';
import FormBuilderHeader from '../../components/form-builder/FormBuilderHeader';
import FixedApplicantFields from '../../components/form-builder/FixedApplicationFields';

import { validateQuestion } from '../../lib/validateQuestions';
import { useOpeningBuilder } from '../../hooks/useOpeningBuilderContext';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function OpeningDetailsForm() {
    const { openingData, questions, resetOpening } = useOpeningBuilder();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const handlePreview = () => {
        setPreviewOpen(true);
    };

    const handleSave = async () => {
        for (const q of questions) {
            const error = validateQuestion(q);

            if (error) {
                alert(`Error in question "${q.title}": ${error}`);
                return;
            }
        }

        let mappedWorkType = 'ONSITE'; // Default fallback
        if (openingData.workType) {
            const wt = openingData.workType.toUpperCase();
            if (wt.includes('HYBRID') || wt.includes('PART')) mappedWorkType = 'HYBRID';
            else if (wt.includes('REMOTE')) mappedWorkType = 'REMOTE';
            else mappedWorkType = 'ONSITE';
        }

        const payload = {
            title: openingData.title || '',
            domain: openingData.domain || '',
            workType: mappedWorkType,
            numberOfSlots: parseInt(openingData.openings) || 1,
            preText: openingData.preText || '',
            aboutRole: openingData.about || '',
            skillsRequired: openingData.skills || '',
            extraInfo: openingData.extra || '',
            questions, // Custom questions, may be handled by another route
        };

        try {
            setSaving(true);

            await fetch(`${import.meta.env.VITE_API_URL}/openings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                },
                body: JSON.stringify(payload),
            });

            alert('Opening created successfully');

            resetOpening();
        } catch (err) {
            console.error(err);
            alert('Failed to save opening');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <motion.main className="flex-1 flex justify-center py-8 px-6">
                <div className="w-full max-w-5xl">
                    <FormBuilderHeader />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="bg-zinc-900 border border-white/10 shadow-2xl rounded-2xl p-10 md:p-12 space-y-10"
                    >
                        <FixedApplicantFields />

                        <QuestionList />

                        <QuestionCreator />

                        {/* ACTION BUTTONS */}
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={handlePreview}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-sm cursor-pointer"
                            >
                                <Eye size={16} />
                                Preview
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 cursor-pointer"
                            >
                                <Save size={16} />
                                {saving ? 'Saving...' : 'Save Form'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.main>

            {previewOpen && <FormPreviewModal onClose={() => setPreviewOpen(false)} />}
        </>
    );
}
