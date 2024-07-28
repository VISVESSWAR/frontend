import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">Admin Panel</div>
      <ul className="flex-1">
        <li className="hover:bg-gray-700">
          <Link to="/admin/dashboard" className="flex items-center p-4">
            <AiFillHome className="mr-4" />
            <span>Home</span>
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/admin/course" className="flex items-center p-4">
            <FaBook className="mr-4" />
            <span>Course</span>
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/admin/users" className="flex items-center p-4">
            <FaUserAlt className="mr-4" />
            <span>User</span>
          </Link>
        </li>
        <li className="hover:bg-gray-700">
          <Link to="/account" className="flex items-center p-4">
            <AiOutlineLogout className="mr-4" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
