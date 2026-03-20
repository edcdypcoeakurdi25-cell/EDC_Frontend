import { motion } from 'framer-motion';

export default function SkillChart({ applications = [] }) {
    const getSkill = (app) => {
        const skillField = app.fieldResponses?.find(f => f.field?.fieldTitle.includes('Skill'));
        return skillField ? parseInt(skillField.responseValue, 10) : null;
    };

    const skillLevel = [5, 4, 3, 2, 1].map(level => ({
        label: level,
        value: applications.filter(app => getSkill(app) === level).length,
    }));

    const maxValue = Math.max(1, ...skillLevel.map(d => d.value));

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#1c1c1c] rounded-2xl p-6 my-6">
            <div className="mb-10">
                <h2 className="text-white text-lg font-semibold">
                    Select the number that best defines your current level of Management Skills
                </h2>
                <p className="text-gray-400 text-sm">{applications.length} Responses</p>
            </div>

            <div className="relative w-full max-w-3xl">
                <div className="absolute left-9 -top-4 bottom-0 w-0.5 bg-gray-300" />

                <div className="space-y-6 pl-14">
                    {skillLevel.map((item, index) => (
                        <div key={item.label} className="flex items-center gap-4">
                            <div className="w-6 -ml-15 text-gray-300 text-sm text-right">
                                {item.label}
                            </div>

                            <div className="flex-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${(item.value / maxValue) * 100}%`,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: 'easeOut',
                                    }}
                                    className="h-8 bg-emerald-400 flex items-center justify-end pr-3"
                                >
                                    <span className="text-white text-m -mr-8">{item.value}</span>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 ml-9 h-0.5 bg-gray-300" />
            </div>
        </div>
    );
}
