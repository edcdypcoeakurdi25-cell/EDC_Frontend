export default function RoleInfo({ opening }) {
    if (!opening) return null;
    return (
        <div className="flex flex-col gap-6 mb-14">
            <InfoRow label="Opening" value={opening.title || "N/A"} />
            <InfoRow label="Number of Openings" value={opening.numberOfSlots || "0"} />
            <InfoRow label="Type of Opening" value={opening.workType || "N/A"} />
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex gap-6">
            <span className="text-neutral-400 min-w-50 text-xl">{label}:</span>

            <span className="text-2xl font-medium text-neutral-300">{value}</span>
        </div>
    );
}
