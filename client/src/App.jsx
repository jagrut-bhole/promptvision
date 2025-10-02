import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  CreatePost,
  Profile,
  SignIn,
  SignUp,
  Landing,
  ExampleGallery,
} from "./pages";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/gallery" element={<ExampleGallery />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

/* 
  {
    // return (
  //   <Router>
  //     <AuthProvider>
  //     <ThemeProvider>
  //       <Routes>
  //         
  //         <Route path="/" element={<Landing />} />
  //         <Route path="/home" element={<Home />} />
  //         <Route path="/create-post" element={<CreatePost />} />
  //         <Route path="/profile" element={<Profile />} />
  //         <Route path="/signin" element={<SignIn />} />
  //         <Route path="/signup" element={<SignUp />} />
  //         <Route path="/gallery" element={<ExampleGallery />} />

  //         <Route path="*" element={<Navigate to="/" replace />} />
  //       </Routes>
  //     </ThemeProvider>
  //     </AuthProvider>
  //   </Router>
  // );
} */
