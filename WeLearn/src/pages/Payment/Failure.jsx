const FailurePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-2xl text-red-500 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-gray-700">Your payment was cancelled. Please try again.</p>
    </div>
  );
};

export default FailurePage;
