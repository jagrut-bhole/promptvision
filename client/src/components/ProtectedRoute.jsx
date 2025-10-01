// import React, { useState, useEffect } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         // First check if user is authenticated
//         const response = await axios.get('/api/v1/users/me', {
//           withCredentials: true
//         });
        
//         if (response.data.success) {
//           const userRole = response.data.data.user.role;
//           setUserRole(userRole);
          
//           // If admin role is required, verify admin access separately
//           if (requiredRole === 'admin') {
//             if (userRole === 'admin') {
//               setIsAuthenticated(true);
//               setIsLoading(false);
//             } else {
//               console.log("User doesn't have admin role");
//               setIsAuthenticated(false);
//               setIsLoading(false);
//               navigate('/admin', { replace: true });
//             }
//           } else {
//             // For non-admin protected routes
//             setIsAuthenticated(true);
//             setIsLoading(false);
//           }
//         } else {
//           setIsAuthenticated(false);
//           setIsLoading(false);
//           navigate('/signin', { replace: true });
//         }
//       } catch (error) {
//         console.error('Authentication error:', error);
//         setIsAuthenticated(false);
//         setIsLoading(false);
//         navigate('/signin', { replace: true });
//       }
//     };

//     verifyUser();
//   }, [navigate, requiredRole]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (requiredRole && userRole !== requiredRole) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setIsLoading(true);
        setAuthError(null);

        // Check if user is authenticated
        const response = await axios.get('/api/v1/users/me', {
          withCredentials: true,
          timeout: 10000 // 10 second timeout
        });
        
        if (response.data.success && response.data.data?.user) {
          const user = response.data.data.user;
          const currentUserRole = user.role;
          
          console.log('User authenticated:', { 
            email: user.email, 
            role: currentUserRole,
            requiredRole 
          });
          
          setUserRole(currentUserRole);
          setIsAuthenticated(true);
          
        } else {
          console.log('Invalid response structure:', response.data);
          setIsAuthenticated(false);
          setAuthError('Invalid authentication response');
        }
        
      } catch (error) {
        console.error('Authentication error:', error);
        
        // Handle different types of errors
        if (error.response?.status === 401) {
          setAuthError('Authentication required');
        } else if (error.response?.status === 403) {
          setAuthError('Access forbidden');
        } else if (error.code === 'ECONNABORTED') {
          setAuthError('Request timeout');
        } else {
          setAuthError('Network error');
        }
        
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []); // Remove navigate and requiredRole from dependencies to prevent loops

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to signin');
    return <Navigate to="/signin" replace state={{ from: window.location.pathname }} />;
  }

  // Check role requirements
  if (requiredRole && userRole !== requiredRole) {
    console.log(`Access denied. Required: ${requiredRole}, User has: ${userRole}`);
    
    if (requiredRole === 'admin') {
      // If admin access is required but user is not admin, redirect to home
      return <Navigate to="/" replace />;
    }
    
    // For other role requirements, redirect to appropriate page
    return <Navigate to="/" replace />;
  }

  // Show error message if there's an auth error but we're still trying
  if (authError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            <p className="font-medium">Authentication Error</p>
            <p className="text-sm mt-1">{authError}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  console.log('Authentication successful, rendering protected content');
  return children;
};

export default ProtectedRoute;