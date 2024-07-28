import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Verify = () => {
  const navigate = useNavigate();
  const { btnLoading, verifyOtp } = UserData();
  const [otp, setOtp] = useState("");
  
  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Sign-in</h2>
        <form onSubmit={submitHandler} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="number"
              required
              placeholder="Enter your 6 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            disabled={btnLoading}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {btnLoading ? "Please Wait..." : "Verify"}
          </button>
          <div className="mt-4 text-center">
            <p>
              Return back to <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Login</Link> page
            </p>
          </div>
        </form>
      </div>
      <footer className="w-full py-4 bg-gray-800 text-white text-center mt-auto">
        Footer Content
      </footer>
    </div>
  );
};

export default Verify;
