import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatedGroup } from './ui/animated-group';
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { Menu, X, User, LogOut, Home, Plus, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { auth, logout: authLogout } = useAuth();
  const user = auth.user;
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        // 'https://promptvision.onrender.com/api/auth/logout',\
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

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Community', href: '/home', icon: Home },
    { name: 'Create', href: '/create', icon: Plus },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-white/10 sticky mb-2 p-2 top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <AnimatedGroup preset="blur-slide">
            <Link to="/home" className="flex items-center space-x-2 group">
              <span className="text-xl font-bold text-white transition-all duration-300">
                PromptVision
              </span>
            </Link>
          </AnimatedGroup>

          {/* Desktop Navigation */}
          <AnimatedGroup preset="blur-slide" className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group ${
                    isActive(item.href)
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </AnimatedGroup>

          {/* User Menu */}
          <AnimatedGroup preset="blur-slide" className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={userMenuRef}>
              <Button 
                variant="ghost" 
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <img
                  className="rounded-full"
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email || 'user'}`}
                  alt="Profile"
                  width={40}
                  height={40}
                  aria-hidden="true"
                />
                <ChevronDown 
                  size={16} 
                  strokeWidth={2} 
                  className={`ms-2 text-amber-50 opacity-60 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true" 
                />
              </Button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl overflow-hidden">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </AnimatedGroup>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <AnimatedGroup preset="blur-slide" className="md:hidden border-t border-white/10 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {user.email || 'user@email.com'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </AnimatedGroup>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
