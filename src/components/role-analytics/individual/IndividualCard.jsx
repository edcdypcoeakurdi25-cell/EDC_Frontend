import IndividualField from './IndividualField';
import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
    enter: direction => ({
        x: direction > 0 ? 40 : -40,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: direction => ({
        x: direction > 0 ? -40 : 40,
        opacity: 0,
    }),
};

export default function IndividualCard({ data, index, direction }) {
    if (!data) return null;

    return (
        <div className="bg-[#1c1c1c] rounded-2xl p-8 border border-white/5 shadow-xl">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.section
                    key={index}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    <IndividualField label="Name" value={data.name} />
                    <IndividualField label="Year of Study" value={data.yearOfStudy} />
                    <IndividualField label="Phone Number" value={data.phoneNumber} />
                    <IndividualField label="Email Address" value={data.email} />
                    <IndividualField label="Branch" value={data.branch} />
                    {data.priorExperience && (
                        <IndividualField label="Prior Experience" value={data.priorExperience} />
                    )}

                    {data.fieldResponses?.map((resp, i) => (
                        <IndividualField
                            key={i}
                            label={resp.field?.fieldTitle || `Custom Field ${i + 1}`}
                            value={
                                resp.field?.inputType === 'UPLOAD_DOC' && resp.fileUrl ? (
                                    <a
                                        href={resp.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-400 hover:underline"
                                    >
                                        {resp.responseValue || "Download File"}
                                    </a>
                                ) : (
                                    resp.responseValue || 'No response'
                                )
                            }
                        />
                    ))}
                </motion.section>
            </AnimatePresence>
        </div>
    );
}
