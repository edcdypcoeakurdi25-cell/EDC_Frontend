export default function QuestionUploadConfig({ config, setConfig }) {
    const types = ['pdf', 'image', 'any'];

    return (
        <div className="mt-4 space-y-2">
            <p className="text-sm text-zinc-400">Allowed File Type</p>

            <div className="flex gap-2">
                {types.map(type => (
                    <button
                        key={type}
                        onClick={() =>
                            setConfig({
                                ...config,
                                type,
                            })
                        }
                        className={`px-3 py-1 rounded-lg text-xs ${
                            config.type === type
                                ? 'bg-white text-black'
                                : 'bg-zinc-800 text-zinc-400'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}
