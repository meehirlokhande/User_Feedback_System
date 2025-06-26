import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardHeader from "./adminDashboardComponents/DashBoardHeader";
import StatsCards from "./adminDashboardComponents/StatsCards";
import FeedbackList from "./adminDashboardComponents/FeedbackList";
import FeedbackModal from "./adminDashboardComponents/FeedbackModal";
import FeedbackStatsChart from "./FeedbackStatsChart";


const AdminDashboard = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({});

    // Fetch all feedback
    const fetchFeedback = async () => {
        try {
            const res = await api.get("/feedback", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setFeedbackList(res.data);
            calculateStats(res.data);
        } catch (err) {
            console.error("Failed to fetch feedback");
        }
    };

    // Calculate statistics from feedback data
    const calculateStats = (data) => {
        const stats = {
            total: data.length,
            pending: data.filter(f => f.status === 'pending').length,
            inProgress: data.filter(f => f.status === 'in-progress').length,
            resolved: data.filter(f => f.status === 'resolved').length,
            categories: {
                general: data.filter(f => f.category === 'general').length,
                bug: data.filter(f => f.category === 'bug').length,
                suggestion: data.filter(f => f.category === 'suggestion').length,
                feature: data.filter(f => f.category === 'feature').length,
            }
        };
        setStats(stats);
    };

    // View feedback details using Get Feedback By Id API
    const handleViewFeedback = async (id) => {
        try {
            const res = await api.get(`/feedback/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setSelectedFeedback(res.data);
            setShowModal(true);
        } catch (err) {
            console.error("Failed to fetch feedback details");
        }
    };

    // Update feedback using Update Feedback API
    const handleUpdateFeedback = async (id, updates) => {
        setLoading(true);
        try {
            await api.put(`/feedback/${id}`, updates, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            await fetchFeedback(); // Refresh the list
            setEditingFeedback(null);
        } catch (err) {
            console.error("Failed to update feedback");
        } finally {
            setLoading(false);
        }
    };

    // Helper functions for styling
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'bug': return 'bg-red-100 text-red-800 border-red-200';
            case 'feature': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'suggestion': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'general': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <DashboardHeader />

                <StatsCards stats={stats} />

                <FeedbackList
                    feedbackList={feedbackList}
                    editingFeedback={editingFeedback}
                    loading={loading}
                    onView={handleViewFeedback}
                    onEdit={setEditingFeedback}
                    onUpdate={handleUpdateFeedback}
                    onCancelEdit={() => setEditingFeedback(null)}
                    getStatusColor={getStatusColor}
                    getCategoryColor={getCategoryColor}
                />

                <FeedbackStatsChart />

                <FeedbackModal
                    showModal={showModal}
                    selectedFeedback={selectedFeedback}
                    onClose={() => setShowModal(false)}
                    getStatusColor={getStatusColor}
                    getCategoryColor={getCategoryColor}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;