import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuestionSelector from '../../components/role-analytics/question/QuestionSelector';
import QuestionResponses from '../../components/role-analytics/question/QuestionResponses';
import QuestionNavigation from '../../components/role-analytics/question/QuestionNavigation';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35 },
    },
};

export default function QuestionPage() {
    const { applications } = useOutletContext();
    const [questionIndex, setQuestionIndex] = useState(0);

    const questions = useMemo(() => {
        const base = [
            { key: 'name', label: 'Enter your Name', type: 'list' },
            { key: 'yearOfStudy', label: 'Choose Year of Study', type: 'grouped' },
            { key: 'phoneNumber', label: 'Enter your Phone Number', type: 'list' },
            { key: 'email', label: 'Enter your Email Address', type: 'list' },
            { key: 'branch', label: 'Choose Branch', type: 'grouped' },
            { key: 'priorExperience', label: 'Prior Experience', type: 'list' },
        ];
        
        const customFieldsMap = new Map();
        applications?.forEach(app => {
            app.fieldResponses?.forEach(resp => {
                const title = resp.field?.fieldTitle;
                if (title && !customFieldsMap.has(title)) {
                    customFieldsMap.set(title, {
                        key: `custom_${title}`,
                        label: title,
                        type: resp.field?.inputType === 'MULTIPLE_CHOICE' ? 'grouped' : 'list',
                        isCustom: true,
                        inputType: resp.field?.inputType
                    });
                }
            });
        });
        
        return [...base, ...Array.from(customFieldsMap.values())];
    }, [applications]);

    const question = questions[questionIndex];
    if (!question) return null;

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 mt-6">
            <motion.div variants={item} className="flex items-center justify-between">
                <QuestionSelector
                    questions={questions}
                    questionIndex={questionIndex}
                    setQuestionIndex={setQuestionIndex}
                />

                <QuestionNavigation
                    questionIndex={questionIndex}
                    total={questions.length}
                    setQuestionIndex={setQuestionIndex}
                />
            </motion.div>

            <motion.div variants={item}>
                <QuestionResponses question={question} applications={applications || []} />
            </motion.div>
        </motion.div>
    );
}
