import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import IndividualCard from '../../components/role-analytics/individual/IndividualCard';
import IndividualNavigator from '../../components/role-analytics/individual/IndividualNavigator';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export default function IndividualPage() {
    const { applications } = useOutletContext();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const safeApplications = applications || [];
    const data = useMemo(() => safeApplications[index], [index, safeApplications]);

    if (!safeApplications || safeApplications.length === 0) {
        return <div className="mt-10 text-center text-neutral-400">No responses available</div>;
    }
    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 mt-6">
            <motion.div variants={item}>
                <IndividualNavigator
                    index={index}
                    setIndex={setIndex}
                    direction={direction}
                    setDirection={setDirection}
                    total={safeApplications.length}
                />
            </motion.div>

            <motion.div variants={item}>
                <IndividualCard data={data} index={index} direction={direction} />
            </motion.div>
        </motion.div>
    );
}
