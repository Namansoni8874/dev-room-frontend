import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="978822142887-b897c5lq1nqhvbc6ef7cmhj10ud5erg4.apps.googleusercontent.com">
        <App />
        <Toaster />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
