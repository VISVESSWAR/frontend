//import React from "react";
import { MdSpaceDashboard, MdLogout } from "react-icons/md";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged out");
    window.location.reload();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
        <div className="space-y-4">
          {user && (
            <>
              <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.name}</p>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
            </>
          )}
          <button
            onClick={() => navigate(`/${user._id}/dashboard`)}
            className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <MdSpaceDashboard className="mr-2" /> Dashboard
          </button>
          {user && user.role === "admin" && (
            <button
              onClick={() => navigate(`/admin/dashboard`)}
              className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              <MdSpaceDashboard className="mr-2" /> Admin Dashboard
            </button>
          )}
          <button
            onClick={logoutHandler}
            className="w-full flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            <MdLogout className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
