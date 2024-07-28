import { useEffect } from "react";
import axios from "axios";
import { CartData } from "../../context/CartContext";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  console.log(publicKey);
  const { cart, handleRemoveCourse, handlePay } = CartData();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      const handlePaymentConfirmation = async () => {
        try {
          const response = await axios.get(
            `${server}/api/user/cart/payment-confirmation?session_id=${sessionId}`
          );
          console.log("Payment confirmed:", response.data);
          navigate("/success");
        } catch (error) {
          console.error("Error confirming payment:", error);
        }
      };

      handlePaymentConfirmation();
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        <ul className="space-y-4">
          {cart.map((course) => (
            <li key={course._id} className="flex items-center space-x-4 p-4 border rounded-md shadow-sm">
              <img src={`${server}/${course.image}`} alt={course.title} className="w-24 h-24 object-cover rounded" />
              <div>
                <h3 className="text-lg font-medium">{course.title}</h3>
                <p className="text-sm text-gray-600">Price: Rs.{course.price}</p>
              </div>
              <button
                onClick={() => handleRemoveCourse(course._id)}
                className="ml-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handlePay}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Pay
          </button>
        </div>
      </div>
      <footer className="w-full py-4 bg-gray-800 text-white text-center mt-auto">
        Footer Content
      </footer>
    </div>
  );
};

export default Cart;
