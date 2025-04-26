import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Home from "./components/home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import AuthCallback from "./components/auth/AuthCallback";
import Dashboard from "./components/dashboard/Dashboard";
import TemplatesPage from "./components/templates/TemplatesPage";
import SubscriptionPlans from "./components/subscription/SubscriptionPlans";
import routes from "tempo-routes";

// Lazy load components that are not needed on initial load
const ResumeEditor = lazy(() => import("./components/resume/ResumeEditor"));
const TemplateSelector = lazy(
  () => import("./components/resume/TemplateSelector"),
);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <p>Loading...</p>
          </div>
        }
      >
        <>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/subscription" element={<SubscriptionPlans />} />
                <Route path="/editor/:resumeId" element={<ResumeEditor />} />
                <Route path="/create-resume" element={<TemplateSelector />} />
              </Route>
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />

            {/* Tempo routes for storyboards */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
