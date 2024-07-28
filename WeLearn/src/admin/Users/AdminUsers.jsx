import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (user && user.role !== "admin") {
    return navigate("/");
  }

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateRole(id) {
    if (confirm("Are you sure you want to update this user's role?")) {
      try {
        const { data } = await axios.put(`${server}/api/user/${id}`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b border-gray-200">#</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">Role</th>
              <th className="py-2 px-4 border-b border-gray-200">
                Update Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((e, i) => (
                <tr key={e._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {i + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {e.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {e.email}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {e.role}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => updateRole(e._id)}
                    >
                      Update Role
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
