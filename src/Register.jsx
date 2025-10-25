// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { loginWithGoogle, sendOtp, verifyOtp } from "./api/authApi";
// import { registerUser } from "./api/userApi";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "shubham",
//     email: "shubham@gmail.com",
//     password: "Shubham123!@",
//   });
//   const [serverError, setServerError] = useState("");
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otpError, setOtpError] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [countdown, setCountdown] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "email") {
//       setServerError("");
//       setOtpError("");
//       setOtpSent(false);
//       setOtpVerified(false);
//       setCountdown(0);
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSendOtp = async () => {
//     if (!formData.email) return setOtpError("Please enter your email first.");
//     try {
//       setIsSending(true);
//       await sendOtp(formData.email);
//       setOtpSent(true);
//       setCountdown(60);
//       setOtpError("");
//     } catch (err) {
//       setOtpError(err.response?.data?.error || "Failed to send OTP.");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp) return setOtpError("Please enter OTP.");
//     try {
//       setIsVerifying(true);
//       await verifyOtp(formData.email, otp);
//       setOtpVerified(true);
//       setOtpError("");
//     } catch (err) {
//       setOtpError(err.response?.data?.error || "Invalid or expired OTP.");
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!otpVerified) return setOtpError("Please verify your email with OTP.");
//     try {
//       await registerUser({ ...formData, otp });
//       setIsSuccess(true);
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setServerError(err.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-5">
//       <h2 className="text-center text-2xl font-semibold mb-3">Register</h2>
//       <form className="flex flex-col" onSubmit={handleSubmit}>
//         <div className="relative mb-3">
//           <label className="block mb-1 font-bold">Name</label>
//           <input
//             type="text"
//             name="name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         <div className="relative mb-3">
//           <label className="block mb-1 font-bold">Email</label>
//           <div className="relative">
//             <input
//               type="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full p-2 pr-24 border ${serverError ? "border-red-500" : "border-gray-300"} rounded`}
//             />
//             <button
//               type="button"
//               onClick={handleSendOtp}
//               disabled={isSending || countdown > 0}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 text-xs rounded"
//             >
//               {isSending
//                 ? "Sending..."
//                 : countdown > 0
//                   ? `${countdown}s`
//                   : "Send OTP"}
//             </button>
//           </div>
//           {serverError && (
//             <span className="absolute text-xs text-red-500 mt-1">
//               {serverError}
//             </span>
//           )}
//         </div>

//         {otpSent && (
//           <div className="relative mb-3">
//             <label className="block mb-1 font-bold">Enter OTP</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 maxLength={4}
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full p-2 pr-24 border border-gray-300 rounded"
//               />
//               <button
//                 type="button"
//                 onClick={handleVerifyOtp}
//                 disabled={isVerifying || otpVerified}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-2 py-1 text-xs rounded"
//               >
//                 {isVerifying
//                   ? "Verifying..."
//                   : otpVerified
//                     ? "Verified"
//                     : "Verify OTP"}
//               </button>
//             </div>
//             {otpError && (
//               <span className="absolute text-xs text-red-500 mt-1">
//                 {otpError}
//               </span>
//             )}
//           </div>
//         )}

//         <div className="relative mb-3">
//           <label className="block mb-1 font-bold">Password</label>
//           <input
//             type="password"
//             name="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           className={`bg-blue-500 text-white py-2 rounded w-full font-medium hover:opacity-90 ${!otpVerified || isSuccess ? "opacity-60 cursor-not-allowed" : ""}`}
//           disabled={!otpVerified || isSuccess}
//         >
//           {isSuccess ? "Registration Successful" : "Register"}
//         </button>
//       </form>

//       <p className="text-center mt-3">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-600 hover:underline">
//           Login
//         </Link>
//       </p>

//       <div className="relative text-center my-3">
//         <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-gray-300"></div>
//         <span className="relative bg-white px-2 text-sm text-gray-600">Or</span>
//       </div>

//       <div className="flex justify-center">
//         <GoogleLogin
//           onSuccess={async (credentialResponse) => {
//             const data = await loginWithGoogle(credentialResponse.credential);
//             if (!data.error) navigate("/");
//           }}
//           onError={() => console.log("Login Failed")}
//           theme="filled_blue"
//           text="continue_with"
//           useOneTap
//         />
//       </div>
//     </div>
//   );
// };

// export default Register;
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle, sendOtp, verifyOtp } from "./api/authApi";
import { registerUser } from "./api/userApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "shubham",
    email: "shubham@gmail.com",
    password: "Shubham123!@",
  });
  const [serverError, setServerError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setServerError("");
      setOtpError("");
      setOtpSent(false);
      setOtpVerified(false);
      setCountdown(0);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) return setOtpError("Please enter your email first.");
    try {
      setIsSending(true);
      await sendOtp(formData.email);
      setOtpSent(true);
      setCountdown(60);
      setOtpError("");
    } catch (err) {
      setOtpError(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setOtpError("Please enter OTP.");
    try {
      setIsVerifying(true);
      await verifyOtp(formData.email, otp);
      setOtpVerified(true);
      setOtpError("");
    } catch (err) {
      setOtpError(err.response?.data?.error || "Invalid or expired OTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) return setOtpError("Please verify your email with OTP.");
    try {
      await registerUser({ ...formData, otp });
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setServerError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-sm">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
        
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <p className="text-sm">{serverError}</p>
          </div>
        )}
        
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                disabled={otpVerified}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-sm border  rounded-lg transition duration-200 focus:ring-2 focus:outline-none pr-24 ${otpVerified && "bg-[#85858b36]"}`}
              />{
                !otpVerified && <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSending || countdown > 0}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs rounded-md transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending
                  ? "Sending..."
                  : countdown > 0
                    ? `${countdown}s`
                    : "Send OTP"}
              </button>
              }
             
            </div>
          </div>

          {otpSent && (
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="relative">
                <input
                  id="otp"
                  type="text"
                  maxLength={4}
                  placeholder="Enter OTP"
                  value={otp}
                  disabled={otpVerified}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none pr-24 ${otpVerified && "bg-[#85858b36]"}`}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifying || otpVerified}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 text-xs rounded-md transition duration-200 ${
                    otpVerified 
                      ? "bg-green-100 text-green-800" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } ${isVerifying ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isVerifying
                    ? "Verifying..."
                    : otpVerified
                      ? "Verified"
                      : "Verify"}
                </button>
              </div>
              {otpError && (
                <p className="text-red-500 text-xs mt-1">{otpError}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!otpVerified || isSuccess}
            className={`w-full py-3 px-4 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSuccess 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-blue-600 hover:bg-blue-700"
            } ${!otpVerified ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSuccess ? "Registration Successful!" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-blue-600 font-medium hover:underline" to="/login">
            Sign in
          </Link>
        </p>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const data = await loginWithGoogle(credentialResponse.credential);
                if (!data.error) navigate("/");
              }}
              onError={() => console.log("Login Failed")}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="300"
              useOneTap
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;