const FeedbackCard = ({
    feedback,
    editingFeedback,
    loading,
    onView,
    onEdit,
    onUpdate,
    onCancelEdit,
    getStatusColor,
    getCategoryColor
}) => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{feedback.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getCategoryColor(feedback.category)}`}>
                            {feedback.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(feedback.status)}`}>
                            {feedback.status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{feedback.email}</p>
                    <p className="text-gray-800 mb-2 line-clamp-2">
                        {feedback.feedback?.length > 100
                            ? `${feedback.feedback.substring(0, 100)}...`
                            : feedback.feedback
                        }
                    </p>
                    <p className="text-xs text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                    {/* Edit Mode */}
                    {editingFeedback === feedback._id ? (
                        <div className="flex items-center space-x-2">
                            <select
                                defaultValue={feedback.category}
                                onChange={(e) => onUpdate(feedback._id, { category: e.target.value })}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                                disabled={loading}
                            >
                                <option value="general">General</option>
                                <option value="bug">Bug</option>
                                <option value="suggestion">Suggestion</option>
                                <option value="feature">Feature</option>
                            </select>
                            <select
                                defaultValue={feedback.status}
                                onChange={(e) => onUpdate(feedback._id, { status: e.target.value })}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                                disabled={loading}
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <button
                                onClick={onCancelEdit}
                                className="text-gray-500 hover:text-gray-700 p-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => onView(feedback._id)}
                                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium bg-indigo-50 px-3 py-1 rounded"
                            >
                                View
                            </button>
                            <button
                                onClick={() => onEdit(feedback._id)}
                                className="text-blue-600 hover:text-blue-900 text-sm font-medium bg-blue-50 px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;