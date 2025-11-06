
const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
        <div className="flex flex-col md:flex-row items-center p-6">
  
          </div>
          <div className="flex-1 text-center md:text-center text-white">
            <h3 className="text-xl font-bold mb-2 text-blue-950">Rate Limit Reached</h3>
            <p className="mb-1 text-blue-950">
              You've made too many requests in a short period. Please wait a moment.
            </p>
      </div>
    </div>
  );
};

export default RateLimitedUI;