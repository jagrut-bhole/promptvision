import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Loader } from "../components/Loader";
import { AnimatedGroup } from "../components/ui/animated-group";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  SquareUserRound,
  LogIn,
  Grid,
} from "lucide-react";
import { GridPattern } from "../components/ui/GridPattern";

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword: _, ...userData } = formData;
      const response = await axios.post(
        "https://promptvision.onrender.com/api/auth/register",
        // "http://localhost:8000/api/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Register response:", response.data);

      // Use the AuthContext login function
      authLogin(
        {
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        },
        response.data.data.user
      );
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GridPattern>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-md w-full space-y-8">
          {/* Header */}
          <AnimatedGroup preset="blur-slide" className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-white/80">Join our community of AI artists</p>
          </AnimatedGroup>

          {/* Form */}
          <AnimatedGroup preset="blur-slide">
            <div className="bg-black/30 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-2xl border border-white/10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-white/90 mb-2 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                    placeholder="Choose a username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white/90 mb-2 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-white/90 mb-2 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 hover:bg-white/10"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 bg-black/20 hover:text-white/80 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 bg-black/20 hover:text-white/80 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 hover:cursor-pointer text-lg font-semibold rounded-xl bg-white text-black disabled:opacity-50 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  {loading ? (
                    <>
                      <Loader size="sm" />
                      <span className="ml-2">Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create account</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/70">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium bg-clip-text text-white transition-all duration-300"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </AnimatedGroup>

          {/* Back to Home */}
          <AnimatedGroup preset="blur-slide" className="text-center">
            <Link
              to="/"
              className="text-sm text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to home
            </Link>
          </AnimatedGroup>
        </div>
      </div>
    </GridPattern>
  );
};
