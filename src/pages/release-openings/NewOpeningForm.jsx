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

    const validate = () => {
        const newErrors = {};

        if (!openingData.title?.trim()) newErrors.title = 'Title is required';
        if (!openingData.domain?.trim()) newErrors.domain = 'Domain is required';
        if (!openingData.workType?.trim()) newErrors.workType = 'Work type required';
        if (!openingData.openings) newErrors.openings = 'Number of openings required';
        if (!openingData.about?.trim()) newErrors.about = 'About role required';
        if (!openingData.skills?.trim()) newErrors.skills = 'Skills required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setOpeningData(prev => ({
            ...prev,
            [name]: value,
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
        navigate("/create-opening/form-builder");
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
                        errors={errors}
                    />

                    <OpeningTextarea
                        label="Pre-text of the Role (for Cards View)"
                        name="preText"
                        value={openingData.preText}
                        onChange={handleChange}
                    />

                    <OpeningTextarea
                        label="About the Role"
                        name="about"
                        value={openingData.about}
                        onChange={handleChange}
                    />

                    <OpeningTextarea
                        label="Skills Required for the Role"
                        name="skills"
                        value={openingData.skills}
                        onChange={handleChange}
                    />

                    <OpeningTextarea
                        label="Extra Information (Optional)"
                        name="extra"
                        value={openingData.extra}
                        onChange={handleChange}
                    />

                    <OpeningFormActions onClear={handleClear} onNext={handleNext} />
                </motion.div>
            </div>
        </motion.main>
    );
}
