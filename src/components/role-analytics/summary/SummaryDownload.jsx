export default function SummaryDownload({ applications = [], opening = null }) {
    const handleDownload = () => {
        if (!applications.length && !opening) {
            alert('No data to download');
            return;
        }

        // Identify all custom fields
        const customFieldTitles = new Set();

        // 1. From opening definition
        const formFields = opening?.form?.customFields || opening?.customFields || [];
        formFields.forEach(f => {
            if (f.fieldTitle) customFieldTitles.add(f.fieldTitle);
        });

        // 2. From applications (fallback/additional)
        applications.forEach(app => {
            app.fieldResponses?.forEach(resp => {
                if (resp.field?.fieldTitle) {
                    customFieldTitles.add(resp.field.fieldTitle);
                }
            });
        });

        const customFields = Array.from(customFieldTitles);

        // CSV Headers
        const headers = [
            'Name',
            'Email',
            'Phone',
            'Year of Study',
            'Branch',
            'Prior Experience',
            ...customFields,
        ];

        // Format Rows
        const rows = applications.map(app => {
            const row = [
                app.name || '',
                app.email || '',
                app.phoneNumber || '',
                app.yearOfStudy || '',
                app.branch || '',
                `"${(app.priorExperience || '').replace(/"/g, '""')}"`,
            ];

            // Add custom field responses
            customFields.forEach(title => {
                const resp = app.fieldResponses?.find(f => f.field?.fieldTitle === title);
                row.push(`"${(resp?.responseValue || '').replace(/"/g, '""')}"`);
            });

            return row.join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `applications_summary_${new Date().toISOString().split('T')[0]}.csv`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition cursor-pointer"
        >
            Download Responses
        </button>
    );
}
