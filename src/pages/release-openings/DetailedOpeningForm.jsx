import { motion } from 'framer-motion';
import QuestionList from '../../components/form-builder/QuestionList';
import QuestionCreator from '../../components/form-builder/QuestionCreator';
import FormBuilderHeader from '../../components/form-builder/FormBuilderHeader';
import FixedApplicantFields from '../../components/form-builder/FixedApplicationFields';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function OpeningDetailsForm() {
    return (
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
                </motion.div>
            </div>
        </motion.main>
    );
}
