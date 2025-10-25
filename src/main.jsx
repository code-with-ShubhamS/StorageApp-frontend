import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <div className="min-h-screen  sm:px-6">
        <div className="max-w-5xl mx-auto">
          <App />
        </div>
      </div>
    </GoogleOAuthProvider>
  </StrictMode>
);
