import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImageCard } from "../components/ImageCard";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { AnimatedGroup } from "../components/ui/animated-group";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { ImageIcon, User, Sparkles } from "lucide-react";

import { GridPattern } from "../components/ui/GridPattern";

export const Profile = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { auth, logout: authLogout } = useAuth();
  const user = auth.user;

  const fetchUserImages = async () => {
    try {
      setError(null);
      if (!user) {
        throw new Error("User not found");
      }

      const response = await axios.get(
        `https://promptvision.onrender.com/api/images/user/${user._id}`,
        // `http://localhost:8000/api/images/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setImages(response.data.data.images || []);
    } catch (err) {
      console.error("Error fetching user images:", err);
      setError("Failed to load your images. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserImages();
  };

  const handleImageClick = (image) => {
    // You can implement a modal or detailed view here
    console.log("Image clicked:", image);
  };

  useEffect(() => {
    fetchUserImages();
  }, []);

  if (loading) {
    return (
      <GridPattern>
        <div className="min-h-screen relative bg-black overflow-hidden flex items-center justify-center">
          <div className="relative z-10 text-center">
            <Loader size="lg" />
            <p className="mt-4 text-white/80">Loading your profile...</p>
          </div>
        </div>
      </GridPattern>
    );
  }

  return (
    <GridPattern>
      <div className="min-h-screen relative overflow-hidden">
        <Navbar />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header Section */}
          <AnimatedGroup preset="blur-slide" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Profile
                </h1>
                {/* <p className="text-xl text-white/80">Manage your shared artwork and profile settings</p> */}
              </div>
            </div>
          </AnimatedGroup>

          {/* User Info */}
          {user && (
            <AnimatedGroup preset="blur-slide" className="mb-8">
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
                <div className="flex ml-3 items-center gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Name: {user.fullName || "User"}
                    </h2>
                    <p className="text-white/70 mb-2">
                      Username: @{user.username}
                    </p>
                    <p className="text-sm text-white/50">Email: {user.email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/70">Images Created</div>
                    <div className="text-4xl font-bold text-white mb-1">
                      {images.length}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          )}

          {error ? (
            <AnimatedGroup preset="blur-slide" className="text-center py-12">
              <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-400"
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
                <h3 className="text-xl font-semibold text-white mb-2">
                  Oops! Something went wrong
                </h3>
                <p className="text-red-400 mb-6">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            </AnimatedGroup>
          ) : images.length === 0 ? (
            <AnimatedGroup preset="blur-slide" className="text-center py-12">
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-md mx-auto border border-white/10">
                <div className="w-16 h-16 bg-linear-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  No Images Yet
                </h3>
                <p className="text-white/70 mb-6">
                  Start creating amazing AI artwork to see it here!
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 text-black rounded-lg hover:bg-white transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Create Your First Art</span>
                </Link>
              </div>
            </AnimatedGroup>
          ) : (
            <>
              {/* Image Grid */}
              <AnimatedGroup
                preset="blur-slide"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {images.map((image, index) => (
                  <div key={image._id || index} className="group">
                    <ImageCard image={image} onImageClick={handleImageClick} />
                  </div>
                ))}
              </AnimatedGroup>
            </>
          )}
        </div>
      </div>
    </GridPattern>
  );
};
