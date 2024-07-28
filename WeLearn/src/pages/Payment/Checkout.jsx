import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CartData } from "../../context/CartContext";

const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
console.log(publicKey);
const stripePromise = loadStripe(publicKey);

const Checkout = () => {
  const { handlePay } = CartData();

  return (
    <Elements stripe={stripePromise}>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Checkout Page</h1>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
          onClick={handlePay}
        >
          Proceed to Payment
        </button>
      </div>
    </Elements>
  );
};

export default Checkout;
