import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const LoginForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await api.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            navigate("/admin");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
                    <p className="text-lg text-gray-600">
                        Sign in to access the feedback management dashboard
                    </p>
                </div>

                {/* Login Form Container */}
                <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Admin Login</h2>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-red-700 font-medium">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-6 rounded-md font-medium text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
        
                        <p className="text-center text-xs text-gray-400 mt-2">
                            Only authorized personnel can access the admin dashboard
                        </p>
                    </div>

                    {/* Back to Feedback Link */}
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors duration-200"
                        >
                            ← Back to Feedback Form
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;