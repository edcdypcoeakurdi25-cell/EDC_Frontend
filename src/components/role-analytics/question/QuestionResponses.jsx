import { useMemo } from 'react';
import { motion } from 'framer-motion';

const groupedOptions = {
    yearOfStudy: ['FIRST', 'SECOND', 'THIRD', 'FOURTH'],
    branch: ['CS', 'IT', 'ENTC', 'AIDS', 'MECH', 'CIVIL', 'RNA', 'INSTRU'],
    skillLevel: ['1', '2', '3', '4', '5'],
};

export default function QuestionResponses({ question, applications = [] }) {
    const data = useMemo(() => {
        if (question.type === 'grouped') {
            const options = question.isCustom ? [] : (groupedOptions[question.key] || []);
            const countMap = {};
            options.forEach(opt => (countMap[opt] = 0));

            applications.forEach(r => {
                let value;
                if (question.isCustom) {
                    const field = r.fieldResponses?.find(f => f.field?.fieldTitle === question.label);
                    value = field ? field.responseValue : null;
                } else {
                    value = r[question.key];
                }
                
                if (value) {
                    // For multiple choice, it can be comma separated or scalar. Handle comma separated for MULTIPLE_CORRECT
                    const values = value.includes(',') ? value.split(',').map(v => v.trim()) : [value];
                    values.forEach(v => {
                        if (!countMap.hasOwnProperty(v) && question.isCustom) countMap[v] = 0;
                        if (countMap.hasOwnProperty(v)) countMap[v] += 1;
                    });
                }
            });

            return Object.entries(countMap).map(([label, count]) => ({
                label,
                count,
            }));
        }

        return applications.map(r => {
            if (question.isCustom) {
                 const field = r.fieldResponses?.find(f => f.field?.fieldTitle === question.label);
                 if (!field) return null;
                 if (field.field?.inputType === 'UPLOAD_DOC' && field.fileUrl) {
                     return { name: field.responseValue || "Download File", url: field.fileUrl };
                 }
                 return field.responseValue || null;
            } else if (question.key === 'resume') {
                 const resumeField = r.fieldResponses?.find(f => f.field?.inputType === 'UPLOAD_DOC');
                 return resumeField ? { name: resumeField.responseValue, url: resumeField.fileUrl } : null;
            } else if (question.key === 'skillLevel') {
                 const skillField = r.fieldResponses?.find(f => f.field?.fieldTitle.includes('Skill'));
                 return skillField ? skillField.responseValue : null;
            } else {
                 return r[question.key];
            }
        }).filter(Boolean);
    }, [question, applications]);

    return (
        <div className="rounded-2xl bg-[#1c1c1c] p-6 border border-white/5">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">{question.label}</h2>
            </div>

            <div className="space-y-3">
                {data.length === 0 ? <div className="text-white">No responses</div> : question.type === 'grouped'
                    ? data.map((item, index) => (
                          <motion.div
                              key={item.label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center justify-between rounded-xl bg-neutral-900 px-5 py-3"
                        >
                            <span className="text-sm text-white">{item.value}</span>
                            <span className="text-sm text-neutral-400">{item.count} Responses</span>
                          </motion.div>
                      ))
                    : data.map((value, index) => (
                          <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="rounded-xl bg-neutral-900 px-5 py-3 text-sm"
                          >
                              {question.key === 'resume' && value.url ? (
                                  <a
                                      href={value.url}
                                      download
                                      className="text-emerald-400 hover:underline"
                                  >
                                      {value.name || "Download Resume"}
                                  </a>
                              ) : (
                                  <span className="text-white">{value.name || value}</span>
                              )}
                          </motion.div>
                      ))}
            </div>
        </div>
    );
}
