import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import api from "../api/api";

const FeedbackStatsChart = () => {
    const [stats, setStats] = useState([]);

    const fetchStats = async () => {
        try {
            const res = await api.get("/feedback/stats", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setStats(res.data);
        } catch (err) {
            console.error("Error fetching stats", err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-8">
            <h3 className="text-lg font-semibold mb-4">Feedback by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FeedbackStatsChart;
