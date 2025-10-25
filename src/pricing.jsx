import React, { useState } from "react";
import PricingCard from "./components/PricingCard";

// Data structure for all plans and their prices
const plansData = {
  monthly: [
    {
      name: "Basic",
      storage: "100 GB",
      price: 399,
      original: null,
      savings: null,
      planId: "plan_RW1v8TrC23xypl",
      features: [
        "100 GB Secure Storage",
        "30-Day File Versioning",
        "Email Support",
        "Standard Speed Transfer",
      ],
      description:
        "Ideal for personal files, photo backups, and securing your most important documents.",
      isPopular: false,
    },
    {
      name: "Pro",
      storage: "1 TB",
      price: 599,
      original: null,
      savings: null,
      planId: "plan_RW1x4N4pMYzaR6",
      features: [
        "1 TB (1000 GB) Storage",
        "90-Day File Versioning",
        "Priority Chat Support",
        "Advanced Sharing Controls",
        "High Speed Transfer",
      ],
      description:
        "Perfect for small teams, professionals, and creatives who handle large media files regularly.",
      isPopular: true,
    },
    {
      name: "Enterprise",
      storage: "5 TB",
      price: 999,
      original: null,
      savings: null,
      planId: "plan_RW1yLc6Iqz0vtG",
      features: [
        "5 TB (5000 GB) Massive Storage",
        "Unlimited Version History",
        "Dedicated Account Manager",
        "Multi-User Access (up to 5)",
        "Guaranteed Uptime SLA",
      ],
      description:
        "Maximum capacity for growing businesses, power users, and large-scale data archiving.",
      isPopular: false,
    },
  ],
  yearly: [
    {
      name: "Basic",
      storage: "100 GB",
      price: 3830,
      original: 4788,
      savings: "20% OFF",
      planId: "plan_RW24rk6mz1KDyL",
      features: [
        "100 GB Secure Storage",
        "30-Day File Versioning",
        "Email Support",
        "Standard Speed Transfer",
      ],
      description:
        "Ideal for personal files, photo backups, and securing your most important documents.",
      isPopular: false,
    },
    {
      name: "Pro",
      storage: "1 TB",
      price: 5391,
      original: 7188,
      savings: "25% OFF",
      planId: "plan_RW25qceUKvROVS",
      features: [
        "1 TB (1000 GB) Storage",
        "90-Day File Versioning",
        "Priority Chat Support",
        "Advanced Sharing Controls",
        "High Speed Transfer",
      ],
      description:
        "Perfect for small teams, professionals, and creatives who handle large media files regularly.",
      isPopular: true,
    },
    {
      name: "Enterprise",
      storage: "5 TB",
      price: 8392,
      original: 11988,
      savings: "30% OFF",
      planId: "plan_RW26aF1VPKhQn1",
      features: [
        "5 TB (5000 GB) Massive Storage",
        "Unlimited Version History",
        "Dedicated Account Manager",
        "Multi-User Access (up to 5)",
        "Guaranteed Uptime SLA",
      ],
      description:
        "Maximum capacity for growing businesses, power users, and large-scale data archiving.",
      isPopular: false,
    },
  ],
};

// Component for the billing cycle toggle
const BillingToggle = ({ isYearly, setBillingCycle }) => (
  <div className="flex justify-center mb-10">
    <div className="relative flex items-center p-1 rounded-full bg-gray-100 shadow-inner">
      {/* Background pill for active state */}
      <div
        className={`absolute top-1 left-1 h-8 w-1/2 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isYearly
            ? "translate-x-full bg-indigo-500"
            : "translate-x-0 bg-indigo-500"
        }`}
      />

      {/* Monthly Button */}
      <button
        onClick={() => setBillingCycle(false)}
        className={`z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
          isYearly ? "text-gray-700 hover:text-indigo-900" : "text-white"
        }`}
      >
        Monthly Billing
      </button>

      {/* Yearly Button */}
      <button
        onClick={() => setBillingCycle(true)}
        className={`z-10 px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
          isYearly ? "text-white" : "text-gray-700 hover:text-indigo-900"
        }`}
      >
        Yearly Billing
      </button>
    </div>
  </div>
);

// Main App Component
const PrcingPage = () => {
  const [isYearly, setIsYearly] = useState(true); // Default to yearly for better conversion
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  // load external script helper
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Script load error"));
      document.body.appendChild(script);
    });

  // Updated: sends planId to backend, gets subscriptionId and opens Razorpay checkout
  const createSubscription = async (plan, isYearlyCycle) => {
    const planId = isYearlyCycle ? plan.planId : plan.planId; // Use the same planId for both cycles
    setSelectedPlanId(planId); // show selected id in UI immediately
    // Show loader before opening Razorpay
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/payments/create-subscription`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId }),
        }
      );

      const payload = await res.json();
      const { subscriptionId, razorpayOptions } = payload;

      if (!subscriptionId) {
        console.error("Invalid response from backend", payload);
        alert("Invalid subscription response. Please contact support.");
        return;
      }

      setLoading(false);
      // ensure Razorpay checkout script is loaded
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      // build options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        subscription_id: subscriptionId,
        name: razorpayOptions?.name || "shubham storage app owner",
        description:
          razorpayOptions?.description || "this is my demo description",
        image: razorpayOptions?.image || undefined,
        notes: { planId },
        handler: function (response) {
          console.log("Razorpay success response:", response);
          // redirect to subscription success page (backend or frontend)
          window.location.href = "/subscription/success";
        },
        modal: {
          ondismiss: function () {
            console.log("User closed the Razorpay modal");
            setLoading(false); // Hide loader when modal is dismissed
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // Hide loader when Razorpay popup is closed
    } catch (err) {
      console.error("Subscription flow error", err);
      alert("Subscription failed. Please try again later.");
      setLoading(false); // Hide loader on error
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="loader"></div>{" "}
          {/* Add your loader component or spinner here */}
        </div>
      )}
      <header className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Cloud Storage Plans Designed For You
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Select the ideal plan based on your storage needs and save big with
          annual commitment.
        </p>
        {selectedPlanId && (
          <div className="mt-4 text-sm text-indigo-700">
            Selected Plan ID:{" "}
            <span className="font-mono bg-indigo-50 px-2 rounded">
              {selectedPlanId}
            </span>
          </div>
        )}
      </header>

      <BillingToggle isYearly={isYearly} setBillingCycle={setIsYearly} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {(isYearly ? plansData.yearly : plansData.monthly).map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isYearly={isYearly}
              onChoose={() => createSubscription(plan, isYearly)}
            />
          ))}
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>
          Prices are inclusive of all applicable taxes and are charged in INR.
        </p>
        <p>
          The annual plans are billed upfront and reflect the indicated savings.
        </p>
      </footer>
    </div>
  );
};

export default PrcingPage;
