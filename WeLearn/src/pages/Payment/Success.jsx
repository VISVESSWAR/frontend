import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";

const SuccessPage = () => {
  const { setUser } = UserData();
  const location = useLocation();
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchPaymentConfirmation = async (sessionId) => {
    try {
      const response = await axios.post(
        `${server}/api/user/cart/payment-confirmation`,
        { session_id: sessionId }
      );
      setPayment(response.data.payment);
      setUser(response.data.user);
      console.log("Payment data:", response.data.payment);
    } catch (error) {
      console.error("Error fetching session:", error);
      setError(
        error.response
          ? error.response.data.message
          : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId && !hasFetched) {
      fetchPaymentConfirmation(sessionId);
      setHasFetched(true);
    } else if (!sessionId) {
      setError("Session ID is missing");
      setLoading(false);
    }
  }, [location.search, hasFetched]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Payment Successful</h1>
      {loading && <p className="text-lg text-gray-700">Loading payment details...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
      {payment && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg text-gray-700 mb-4">Thank you for your purchase!</p>
          <p className="text-md text-gray-600 mb-2">Session ID: {payment.paymentId}</p>
          <p className="text-md text-gray-600 mb-4">Payment Status: {payment.paymentStatus}</p>
          <Link to="/dashboard" className="text-blue-500 hover:underline">Go to Dashboard</Link>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
