import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImageCard } from '../components/ImageCard';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/Navbar';
import { AnimatedGroup } from '../components/ui/animated-group';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { RefreshCw, ImageIcon, User, Settings, LogOut, Sparkles, Palette } from 'lucide-react';

const Profile = () => {
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
        throw new Error('User not found');
      }
      
      const response = await axios.get(
        `http://localhost:8000/api/images/user/${user._id}`,
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      
      setImages(response.data.data.images || []);
    } catch (err) {
      console.error('Error fetching user images:', err);
      setError('Failed to load your images. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserImages();
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/auth/logout',
        {},
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authLogout();
    }
  };

  const handleImageClick = (image) => {
    // You can implement a modal or detailed view here
    console.log('Image clicked:', image);
  };

  useEffect(() => {
    fetchUserImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="w-8 h-8 text-white" />
          </div>
          <Loader size="lg" />
          <p className="mt-4 text-white/80">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50"></div>
      
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <AnimatedGroup preset="blur-slide" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                My
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Profile
                </span>
              </h1>
              {/* <p className="text-xl text-white/80">Manage your shared artwork and profile settings</p> */}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <ImageIcon className="w-4 h-4" />
                <span>{images.length} shared images</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </AnimatedGroup>

        {/* User Info */}
        {user && (
          <AnimatedGroup preset="blur-slide" className="mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl font-bold">
                    {user.fullName?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {user.fullName || 'User'}
                  </h2>
                  <p className="text-white/70 mb-2">@{user.username}</p>
                  <p className="text-sm text-white/50">{user.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-1">{images.length}</div>
                  <div className="text-sm text-white/70">Images Created</div>
                </div>
              </div>
            </div>
          </AnimatedGroup>
        )}

        {error ? (
          <AnimatedGroup preset="blur-slide" className="text-center py-12">
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
              <p className="text-red-400 mb-6">{error}</p>
              <button
                onClick={handleRefresh}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </AnimatedGroup>
        ) : images.length === 0 ? (
          <AnimatedGroup preset="blur-slide" className="text-center py-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-12 max-w-md mx-auto border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">No Images Yet</h3>
              <p className="text-white/70 mb-6">
                Start creating amazing AI artwork to see it here!
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                <span>Create Your First Art</span>
              </Link>
            </div>
          </AnimatedGroup>
        ) : (
          <>
            {/* Stats */}
            <AnimatedGroup preset="blur-slide" className="mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {images.length}
                    </div>
                    <div className="text-white/70 flex items-center justify-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Total Images</span>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {new Set(images.map(img => img.style)).size}
                    </div>
                    <div className="text-white/70 flex items-center justify-center gap-2">
                      <Palette className="w-4 h-4" />
                      <span>Styles Used</span>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {images.length > 0 ? Math.round(images.reduce((acc, img) => acc + img.prompt.length, 0) / images.length) : 0}
                    </div>
                    <div className="text-white/70 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Avg Prompt Length</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGroup>

            {/* Image Grid */}
            <AnimatedGroup preset="blur-slide" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <div key={image._id || index} className="group">
                  <ImageCard
                    image={image}
                    onImageClick={handleImageClick}
                  />
                </div>
              ))}
            </AnimatedGroup>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
