import { useState } from 'react';
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

const questions = [
    { key: 'name', label: 'Enter your Name', type: 'list' },
    { key: 'yearOfStudy', label: 'Choose Year of Study', type: 'grouped' },
    { key: 'phoneNumber', label: 'Enter your Phone Number', type: 'list' },
    { key: 'email', label: 'Enter your Email Address', type: 'list' },
    { key: 'branch', label: 'Choose Branch', type: 'grouped' },
    { key: 'priorExperience', label: 'Prior experience in Operations', type: 'list' },
    { key: 'skillLevel', label: 'Management Skill Level', type: 'grouped' },
    { key: 'resume', label: 'Upload Resume', type: 'list' },
];

export default function QuestionPage() {
    const { applications } = useOutletContext();
    const [questionIndex, setQuestionIndex] = useState(0);

    const question = questions[questionIndex];

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
