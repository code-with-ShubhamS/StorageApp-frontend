const SubscriptionSuccess = () => {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase. Your plan is now active.</p>
      <a
        href="/dashboard"
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Go to Dashboard
      </a>
    </div>
  );
};

export default SubscriptionSuccess;
