import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpeningTextarea from '../../components/opening-form/OpeningTextarea';
import OpeningFormHeader from '../../components/opening-form/OpeningFormHeader';
import OpeningFormFields from '../../components/opening-form/OpeningFormFields';
import OpeningFormActions from '../../components/opening-form/OpeningFormActions';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
        },
    },
};

export default function NewOpeningForm() {
    const navigate = useNavigate();

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState('Opening Title');

    const [formData, setFormData] = useState({
        domain: '',
        workType: '',
        openings: '',
        preText: '',
        about: '',
        skills: '',
        extra: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClear = () => {
        setFormData({
            domain: '',
            workType: '',
            openings: '',
            preText: '',
            about: '',
            skills: '',
            extra: '',
        });
    };

    const handleNext = () => {
        navigate('/opening-form-details');
    };

    return (
        <motion.main className="flex-1 flex justify-center py-8 px-6">
            <div className="w-full max-w-5xl">
                <OpeningFormHeader
                    navigate={navigate}
                    title={title}
                    setTitle={setTitle}
                    isEditingTitle={isEditingTitle}
                    setIsEditingTitle={setIsEditingTitle}
                />

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="bg-zinc-900 border border-white/10 shadow-2xl rounded-2xl p-10 md:p-12"
                >
                    <OpeningFormFields formData={formData} handleChange={handleChange} />

                    <OpeningTextarea
                        label="Pre-text of the Role (for Cards View)"
                        name="preText"
                        value={formData.preText}
                        onChange={handleChange}
                    />

                    <OpeningTextarea
                        label="About the Role"
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                    />

                    <OpeningTextarea
                        label="Skills Required for the Role"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />

                    <OpeningTextarea
                        label="Extra Information (Optional)"
                        name="extra"
                        value={formData.extra}
                        onChange={handleChange}
                    />

                    <OpeningFormActions onClear={handleClear} onNext={handleNext} />
                </motion.div>
            </div>
        </motion.main>
    );
}
