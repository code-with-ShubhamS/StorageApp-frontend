// Component for a single pricing card
const PricingCard = ({ plan, isYearly, onChoose }) => {
  // Directly use the plan object since it contains the necessary properties
  const price = plan.price; // Use the same price for both cycles
  const isRecommended = plan.isPopular && isYearly;

  const handleClick = () => {
    // Use the planId directly
    const id = plan.planId;
    if (!id) {
      // fallback deterministic id
      const fallback = `${plan.name.toLowerCase().replace(/\s+/g, "-")}-${
        isYearly ? "yearly" : "monthly"
      }`;
      console.warn(
        `Plan id missing for ${plan.name}. Using fallback id: ${fallback}`
      );
      // call parent with fallback so caller always gets an id
      if (typeof onChoose === "function") onChoose(fallback);
      return;
    }
    if (typeof onChoose === "function") onChoose(id);
  };

  return (
    <div
      className={`
                relative flex flex-col p-6 mx-auto w-full max-w-sm rounded-xl shadow-2xl transition-all duration-300 transform h-full
                ${
                  isRecommended
                    ? "bg-white ring-4 ring-indigo-600 scale-105"
                    : "bg-white hover:shadow-indigo-300/50"
                }
            `}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1 text-xs font-bold text-white bg-indigo-600 rounded-lg shadow-lg rotate-3">
          RECOMMENDED
        </div>
      )}

      <h3
        className={`text-2xl font-extrabold ${
          isRecommended ? "text-indigo-700" : "text-gray-900"
        }`}
      >
        {plan.name}
      </h3>
      <p className="mt-2 text-sm text-gray-500 h-10">{plan.description}</p>

      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-extrabold tracking-tight text-gray-900">
          ₹{price.toLocaleString("en-IN")}
        </span>
        <span className="ml-1 text-lg font-medium text-gray-500">
          /{isYearly ? "year" : "month"}
        </span>
      </div>

      {/* Savings Display (Yearly only) */}
      {isYearly && plan.original && (
        <div className="text-sm font-medium mt-1">
          <span className="text-red-500 line-through mr-2">
            ₹{plan.original.toLocaleString("en-IN")}
          </span>
          <span className="text-green-600 font-bold">{plan.savings}</span>
        </div>
      )}

      <p className="mt-4 text-lg font-semibold text-indigo-600">
        {plan.storage} Storage
      </p>

      <ul role="list" className="mt-6 space-y-3 flex-grow">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start">
            <svg
              className="flex-shrink-0 w-6 h-6 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-3 text-base text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleClick}
        className={`mt-8 w-full py-3 px-6 border border-transparent rounded-lg text-lg font-bold shadow-md transition duration-150 ease-in-out 
                    ${
                      isRecommended
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                        : "bg-gray-200 text-indigo-700 hover:bg-indigo-300 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                    }
                `}
      >
        {isRecommended ? "Start Saving Now" : "Choose Plan"}
      </button>
    </div>
  );
};

export default PricingCard;
