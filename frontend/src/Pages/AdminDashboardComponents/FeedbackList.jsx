import FeedbackCard from './FeedbackCard';

const FeedbackList = ({
    feedbackList,
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
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Feedback Management</h2>
                <p className="text-gray-600 text-sm">View, edit, and manage user feedback</p>
            </div>

            <div className="p-6">
                {feedbackList.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by encouraging users to submit feedback.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {feedbackList.map((feedback) => (
                            <FeedbackCard
                                key={feedback._id}
                                feedback={feedback}
                                editingFeedback={editingFeedback}
                                loading={loading}
                                onView={onView}
                                onEdit={onEdit}
                                onUpdate={onUpdate}
                                onCancelEdit={onCancelEdit}
                                getStatusColor={getStatusColor}
                                getCategoryColor={getCategoryColor}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;