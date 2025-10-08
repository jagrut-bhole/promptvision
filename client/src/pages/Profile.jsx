import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImageCard } from '../components/ImageCard';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { RefreshCw, ImageIcon, User, Settings, LogOut } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* User Info */}
        {user && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {user.fullName?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.fullName || 'User'}
                </h2>
                <p className="text-gray-600 mb-2">@{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600 mb-1">{images.length}</div>
                <div className="text-sm text-gray-600">Images Created</div>
              </div>
            </div>
          </div>
        )}

        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Images Yet</h3>
              <p className="text-gray-600 mb-6">
                Start creating amazing AI artwork to see it here!
              </p>
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <ImageIcon className="w-5 h-5" />
                <span>Create Your First Art</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{images.length}</div>
                    <div className="text-sm text-gray-600">Total Images</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {new Set(images.map(img => img.style)).size}
                    </div>
                    <div className="text-sm text-gray-600">Styles Used</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {images.length > 0 ? Math.round(images.reduce((acc, img) => acc + img.prompt.length, 0) / images.length) : 0}
                    </div>
                    <div className="text-sm text-gray-600">Avg Prompt Length</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <ImageCard
                  key={image._id || index}
                  image={image}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
