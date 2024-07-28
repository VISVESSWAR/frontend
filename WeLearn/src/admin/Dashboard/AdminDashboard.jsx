import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";

const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  if (user && user.role !== "admin") {
    return navigate("/");
  }

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
          <div className="space-y-4">
            <p className="text-gray-700"><span className="font-semibold">Total Users:</span> {stats.users}</p>
            <p className="text-gray-700"><span className="font-semibold">Total Courses:</span> {stats.courses}</p>
            <p className="text-gray-700"><span className="font-semibold">Total Lectures:</span> {stats.lectures}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
