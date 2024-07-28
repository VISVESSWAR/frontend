//import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign-up</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Username</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            disabled={btnLoading}
            type="submit"
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
          >
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
