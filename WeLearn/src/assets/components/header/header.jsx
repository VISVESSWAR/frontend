import { Link } from "react-router-dom";

const Header = ({ isAuth }) => {
  console.log("isauth:", isAuth);
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to={"/"}>lookSkill</Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/courses" className="hover:text-gray-300">
            Courses
          </Link>
          {isAuth ? (
            <Link to="/account" className="hover:text-gray-300">
              Account
            </Link>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
