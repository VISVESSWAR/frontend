/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
          >
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-purple-700 hover:underline">Sign-Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
