import React from "react";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({children}) => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black/70 backdrop-blur-md text-white">
         <p className="text-2xl font-semibold mb-4">User not Authenticated</p>
         <a href="/signin" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-60">Authenticate</a>
      </div>
    )
  }
  return children;
}

export default ProtectedRoute;