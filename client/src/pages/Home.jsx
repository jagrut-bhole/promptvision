import React, { useState, useEffect } from "react";
import { ImageCard } from "../components/ImageCard";
import { Loader } from "../components/Loader";
import { Navbar } from "../components/Navbar";
import { AnimatedGroup } from "../components/ui/animated-group";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { Image, ImageIcon, Sparkles} from "lucide-react";
import { Link } from "react-router-dom";
import { GridPattern } from "../components/ui/GridPattern";

export const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { auth } = useAuth();

    const from = location.state?.from?.pathname || '/home';
  const fetchImages = async () => {
    try {
      setError(null);
      const response = await axios.get(
        'https://promptvision.onrender.com/api/images',
        // "http://localhost:8000/api/images",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setImages(response.data.data.images || []);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Failed to load community images. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchImages();
  };


  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-gray-600">Loading community images...</p>
        </div>
      </div>
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
                Community
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-red-400 to-orange-400">
                  Gallery
                </span>
              </h1>
            </div>
          </div>
        </AnimatedGroup>
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
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-md mx-auto border border-white/10">
              <div className="w-16 h-16 bg-linear-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No Images Yet
              </h3>
              <p className="text-white/70 mb-6">
                Be the first to share your AI-generated artwork with the
                community!
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-black rounded-lg hover:bg-white transition-all duration-300"
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
                  <ImageCard image={image} />
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
