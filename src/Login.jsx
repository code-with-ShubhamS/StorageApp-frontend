// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { loginWithGoogle } from "./api/authApi";
// import { loginUser } from "./api/userApi";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "shubham@gmail.com",
//     password: "Shubham123!@",
//   });
//   const [serverError, setServerError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (serverError) setServerError("");
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await loginUser(formData);
//       if (data.error) setServerError(data.error);
//       else navigate("/");
//     } catch (err) {
//       console.error("Login error:", err);
//       setServerError(err.response?.data?.error || "Something went wrong.");
//     }
//   };

//   const hasError = Boolean(serverError);

//   return (
//     <div className="max-w-md mx-auto p-5">
//       <h2 className="text-center text-2xl font-semibold mb-3">Login</h2>
//       <form className="flex flex-col" onSubmit={handleSubmit}>
//         <div className="relative mb-3">
//           <label htmlFor="email" className="block mb-1 font-bold">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             required
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full p-2 border ${hasError ? "border-red-500" : "border-gray-300"} rounded`}
//           />
//         </div>

//         <div className="relative mb-3">
//           <label htmlFor="password" className="block mb-1 font-bold">
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             required
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             className={`w-full p-2 border ${hasError ? "border-red-500" : "border-gray-300"} rounded`}
//           />
//           {serverError && (
//             <span className="absolute top-full left-0 text-red-500 text-xs mt-1">
//               {serverError}
//             </span>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 rounded w-full font-medium hover:opacity-90"
//         >
//           Login
//         </button>
//       </form>

//       <p className="text-center mt-3">
//         Don't have an account?{" "}
//         <Link className="text-blue-600 hover:underline" to="/register">
//           Register
//         </Link>
//       </p>

//       <div className="relative text-center my-3">
//         <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-gray-300"></div>
//         <span className="relative bg-white px-2 text-sm text-gray-600">Or</span>
//       </div>

//       <div className="flex justify-center">
//         <GoogleLogin
//           onSuccess={async (credentialResponse) => {
//             try {
//               const data = await loginWithGoogle(credentialResponse.credential);
//               if (!data.error) navigate("/");
//             } catch (err) {
//               console.error("Google login failed:", err);
//             }
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

// export default Login;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "./api/authApi";
import { loginUser } from "./api/userApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "shubham@gmail.com",
    password: "Shubham123!@",
  });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (serverError) setServerError("");
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const data = await loginUser(formData);
      console.log(data)
      if (data.error) {
        setServerError(data.error);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(errorMessage);

      // Handle field-specific errors from backend if available
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    setServerError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-sm">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Welcome Back
        </h2>

        {/* Display general errors at the top */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <p className="text-sm">{serverError}</p>
          </div>
        )}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 text-sm border ${
                fieldErrors.email
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } rounded-lg transition duration-200 focus:ring-2 focus:outline-none`}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 text-sm border ${
                  fieldErrors.password
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                } rounded-lg transition duration-200 focus:ring-2 focus:outline-none pr-10`}
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
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  setIsSubmitting(true);
                  setServerError("");
                  const data = await loginWithGoogle(
                    credentialResponse.credential
                  );
                  if (data.error) {
                    setServerError(data.error);
                  } else {
                    navigate("/");
                  }
                } catch (err) {
                  console.error("Google login failed:", err);
                  setServerError("Google login failed. Please try again.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="300"
              useOneTap
            />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            className="text-blue-600 font-medium hover:underline"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
