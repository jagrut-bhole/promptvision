import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GridPattern } from "../components/ui/GridPattern";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated || !auth.accessToken) {
    return (
      <GridPattern className="relative">
        <div className="flex items-center justify-center min-h-screen px-4">
          {/* Frosted glass card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center animate-fadeIn">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
              Authentication Required
            </h1>

            {/* Body text */}
            <p className="text-gray-300 mb-8 leading-relaxed">
              You must be logged in to access this page.
            </p>

            {/* Button */}
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-white/80 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-white hover:cursor-pointer hover:scale-[1.03] active:scale-95 transition-all"
            >
              Go to Login
            </button>
          </div>
        </div>
      </GridPattern>
    );
  }

  return children;
};

export default ProtectedRoute;
