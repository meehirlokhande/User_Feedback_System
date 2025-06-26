const FeedbackModal = ({
    showModal,
    selectedFeedback,
    onClose,
    getStatusColor,
    getCategoryColor
}) => {
    if (!showModal || !selectedFeedback) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Feedback Details</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedFeedback.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-sm text-gray-900">{selectedFeedback.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-md border ${getCategoryColor(selectedFeedback.category)}`}>
                                {selectedFeedback.category}
                            </span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(selectedFeedback.status)}`}>
                                {selectedFeedback.status}
                            </span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Feedback</label>
                            <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedFeedback.feedback}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Submitted At</label>
                            <p className="mt-1 text-sm text-gray-900">
                                {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;