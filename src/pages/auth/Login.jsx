import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [domainName, setDomainName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domainName, password }),
            });

            const data = await response.json();

            if (data.success) {
                // Store the JWT token securely
                localStorage.setItem('token', data.data.token);
                // Optionally store user details if needed
                localStorage.setItem('user', JSON.stringify(data.data.user));

                // Redirect to dashboard
                navigate('/');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
            <div className="w-full max-w-sm flex flex-col gap-6">
                <div className="rounded-xl border border-white/10 bg-[#121212] text-white shadow-sm overflow-hidden">
                    <div className="flex flex-col space-y-1.5 px-6 py-4">
                        <h3 className="font-semibold tracking-tight text-xl">Login to your account</h3>
                        <p className="text-sm text-neutral-400">
                            Enter your credentials below to access the dashboard
                        </p>
                    </div>

                    <div className="p-6 pt-0">
                        {!!error && (
                            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleLogin} className="space-y-4 text-sm">
                            <div className="space-y-2">
                                <label
                                    htmlFor="domainName"
                                    className="text-sm font-medium leading-none"
                                >
                                    Username / Domain
                                </label>
                                <input
                                    id="domainName"
                                    type="text"
                                    value={domainName}
                                    onChange={(e) => setDomainName(e.target.value)}
                                    placeholder="domain-position"
                                    required
                                    className="flex h-9 w-full rounded-md border border-white/10 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 mt-1"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium leading-none"
                                    >
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="inline-block text-xs text-neutral-400 underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder='Password'
                                    className="flex h-9 w-full rounded-md border border-white/10 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                                />
                            </div>

                            <div className="pt-2 space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold h-9 px-4 py-2 w-full transition-colors cursor-pointer ${loading ? 'bg-neutral-600 text-neutral-300 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200'}`}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
