import { useState } from "react";
import api from "../api/api";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedback: "",
        category: "general",
    });

    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/feedback", formData);
            setSuccess("Thank you for your feedback!");
            setError(null);
            setFormData({
                name: "",
                email: "",
                feedback: "",
                category: "general",
            });
        } catch (err) {
            setError("Failed to submit feedback. Please try again.");
            setSuccess(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">We Value Your Feedback</h1>
                    <p className="text-lg text-gray-600">
                        Help us improve by sharing your thoughts, suggestions, or concerns.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                        Submit Your Feedback
                    </h2>

                    {/* Success/Error Messages */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-700 font-medium">{success}</p>
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                required
                            />
                        </div>

                        {/* Category Field */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Feedback Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 bg-white"
                            >
                                <option value="general">General Feedback</option>
                                <option value="bug">Bug Report</option>
                                <option value="suggestion">Suggestion</option>
                                <option value="feature">Feature Request</option>
                            </select>
                        </div>

                        {/* Feedback Field */}
                        <div>
                            <label
                                htmlFor="feedback"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Your Feedback <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Please share your feedback in detail..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 resize-none"
                                required
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Minimum 10 characters required
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Submit Feedback
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        
                        <p className="text-center text-xs text-gray-400 mt-2">
                            Thank you for taking the time to share your feedback with us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;