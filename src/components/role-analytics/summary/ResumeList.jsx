import { motion } from 'framer-motion';
import { LuImage } from 'react-icons/lu';
import { GrDocumentPdf } from 'react-icons/gr';

export default function ResumeList({ applications = [] }) {
    const resumes = applications.map(app => {
        const resumeField = app.fieldResponses?.find(f => f.field?.inputType === 'UPLOAD_DOC');
        if (!resumeField || !resumeField.fileUrl) return null;
        
        let type = 'pdf';
        if (resumeField.responseValue && (resumeField.responseValue.endsWith('.jpg') || resumeField.responseValue.endsWith('.png') || resumeField.responseValue.endsWith('.jpeg'))) {
             type = 'image';
        }
        
        return {
             name: resumeField.responseValue || "Download Resume",
             url: resumeField.fileUrl,
             type
        };
    }).filter(Boolean);

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#1c1c1c] rounded-2xl p-6 my-6">
            <div className="mb-4">
                <h2 className="text-white text-lg font-semibold">Upload your Resume</h2>
                <p className="text-gray-400 text-sm">{resumes.length} Responses</p>
            </div>

            <div className="max-h-80 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-transparent">
                <div className="space-y-3">
                    {resumes.map((resume, index) => (
                        <motion.a
                            key={`${resume.name}-${index}`}
                            href={resume.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: index * 0.04 }}
                            className="flex items-center gap-4 bg-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm hover:bg-[#333] transition"
                        >
                            <div className="shrink-0">
                                {resume.type === 'pdf' ? (
                                    <GrDocumentPdf className="text-neutral-50 size-5" />
                                ) : (
                                    <LuImage className="text-neutral-50 size-5" />
                                )}
                            </div>

                            <span className="truncate text-green-400 underline cursor-pointer">
                                {resume.name}
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
}
