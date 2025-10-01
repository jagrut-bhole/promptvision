import { useState } from "react";
import { UserPlus, Lock, Mail, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required...");
      return false;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email...");
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { message } = response.data;
      alert(message || "Login Successful!! Welcome 🎉");

      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Login Error", error);
      const backendMessage =
        error.response?.data?.message || "Login Failed. Please try again..";
      setError(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-white to-gray-50/80 rounded-3xl shadow-2xl shadow-blue-100/50 p-8 flex flex-col items-center border border-gray-100">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg">
          <UserPlus className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-500 text-sm mb-8 text-center max-w-xs">
          Join us today and start your amazing journey with our platform
        </p>

        <div className="w-full flex flex-col gap-4 mb-4">
          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email Address"
              type="email"
              name="email"
              value={formData.email}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-gray-50 text-black text-sm transition-all"
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-gray-50 text-black text-sm transition-all"
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="w-full mb-4">
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              {error}
            </div>
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-6"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
          <span className="mx-4 text-xs text-gray-400">
            Already have an account?
          </span>
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>

        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
          Sign In Instead
        </button>
      </div>
    </div>
  );
};

export default SignIn;
