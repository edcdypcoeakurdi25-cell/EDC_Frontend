import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOpeningBuilder } from '../../hooks/useOpeningBuilderContext';

import OpeningTextarea from '../../components/opening-form/OpeningTextarea';
import OpeningFormHeader from '../../components/opening-form/OpeningFormHeader';
import OpeningFormFields from '../../components/opening-form/OpeningFormFields';
import OpeningFormActions from '../../components/opening-form/OpeningFormActions';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

export default function NewOpeningForm() {
    const navigate = useNavigate();
    const { openingData, setOpeningData } = useOpeningBuilder();

    const [errors, setErrors] = useState({});
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const validateField = (name, value) => {
        switch (name) {
            case 'title':
                if (!value?.trim()) return 'Title is required';
                break;

            case 'domain':
                if (!value?.trim()) return 'Domain is required';
                break;

            case 'workType':
                if (!value?.trim()) return 'Work type is required';
                break;

            case 'openings':
                if (!value) return 'Number of openings is required';
                break;

            case 'preText':
                if (!value?.trim()) return 'Pre-text is required';
                break;

            case 'about':
                if (!value?.trim()) return 'About role is required';
                break;

            case 'skills':
                if (!value?.trim()) return 'Skills is required';
                break;

            default:
                return null;
        }

        return null;
    };

    const validate = () => {
        const newErrors = {};

        Object.entries(openingData).forEach(([key, value]) => {
            const error = validateField(key, value);

            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setOpeningData(prev => ({
            ...prev,
            [name]: value,
        }));

        const error = validateField(name, value);

        setErrors(prev => {
            const updated = { ...prev };

            if (!error) {
                delete updated[name];
            }

            return updated;
        });
    };

    const handleBlur = e => {
        const { name, value } = e.target;

        const error = validateField(name, value);

        setErrors(prev => ({
            ...prev,
            ...(error ? { [name]: error } : {}),
        }));
    };

    const handleTitleChange = value => {
        setOpeningData(prev => ({
            ...prev,
            title: value,
        }));
    };

    const handleClear = () => {
        setOpeningData({
            title: '',
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
        if (!validate()) return;
        navigate('/create-opening/form-builder');
    };

    return (
        <motion.main className="flex-1 flex justify-center py-8 px-6">
            <div className="w-full max-w-5xl">
                <OpeningFormHeader
                    navigate={navigate}
                    title={openingData.title}
                    setTitle={handleTitleChange}
                    isEditingTitle={isEditingTitle}
                    setIsEditingTitle={setIsEditingTitle}
                    error={errors.title}
                />

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="bg-zinc-900 border border-white/10 shadow-2xl rounded-2xl p-10 md:p-12"
                >
                    <OpeningFormFields
                        formData={openingData}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                    />

                    <OpeningTextarea
                        label="Pre-text of the Role (for Cards View)"
                        name="preText"
                        value={openingData.preText}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors.preText}
                    />

                    <OpeningTextarea
                        label="About the Role"
                        name="about"
                        value={openingData.about}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors.about}
                    />

                    <OpeningTextarea
                        label="Skills Required for the Role"
                        name="skills"
                        value={openingData.skills}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors.skills}
                    />

                    <OpeningTextarea
                        label="Extra Information (Optional)"
                        name="extra"
                        value={openingData.extra}
                        onChange={handleChange}
                        handleBlur={handleBlur}
                        error={errors.extra}
                    />

                    <OpeningFormActions onClear={handleClear} onNext={handleNext} />
                </motion.div>
            </div>
        </motion.main>
    );
}
