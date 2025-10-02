import React, { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun, Sparkles, LogOut, Menu, X, Settings, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ isAuthenticated = false, user = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isLandingPage = location.pathname === "/";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear cookies/tokens here
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsDropdownOpen(false);
    navigate('/');
  };

  const authNavItems = [
    {
      name: "Home",
      href: "/home",
    },
    {
      name: "Create Post",
      href: "/create-post",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Contact",
      href: "/Contact",
    },
  ];

  const landingNavItems = [
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "How it Works",
      href: "#how-it-works",
    },
    {
      name: "Pricing",
      href: "#pricing",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  const navItems = isLandingPage ? landingNavItems : authNavItems;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#008055] to-[#0A6647] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Prompt Vision
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </Button>

            {/* Authenticated User Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name || "John Doe"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.email || "john.doe@example.com"}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          navigate("/settings");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                {isLandingPage && (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/login")}
                      className="text-gray-600 dark:text-gray-300 hover:text-[#008055]"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate("/signup")}
                      className="bg-[#008055] hover:bg-[#0A6647] active:bg-[#124E3B] text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Authenticated Menu */}
              {isAuthenticated && user ? (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || "John Doe"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.email || "john.doe@example.com"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-gray-900 dark:text-white"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/settings");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-gray-900 dark:text-white"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-red-600 dark:text-red-400"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </Button>
                </div>
              ) : (
                !isAuthenticated &&
                isLandingPage && (
                  <div className="pt-2 space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate("/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-gray-600 dark:text-gray-300"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/register");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#008055] hover:bg-[#0A6647] text-white">
                      Get Started
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// return (
//   <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
//     <div className="container mx-auto px-6 py-4">
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-gradient-to-br from-[#008055] to-[#0A6647] rounded-lg flex items-center justify-center">
//             <Sparkles className="w-5 h-5 text-white" />
//           </div>
//           <span
//             className="text-2xl font-medium text-gray-900 dark:text-white"
//             style={{ fontFamily: "Balto Medium, Inter, sans-serif" }}
//           >
//             Prompt Vision
//           </span>
//         </div>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center space-x-8">
//           <a
//             href="#features"
//             className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
//             style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
//           >
//             Features
//           </a>
//           <a
//             href="#how-it-works"
//             className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
//             style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
//           >
//             How it Works
//           </a>
//           <a
//             href="#pricing"
//             className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
//             style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
//           >
//             Pricing
//           </a>
//           <a
//             href="#contact-us"
//             className="text-gray-600 dark:text-gray-300 hover:text-[#008055] transition-colors"
//             style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
//           >
//             Contact
//           </a>
//         </nav>

//         {/* Actions */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//           >
//             {theme === "light" ? (
//               <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             ) : (
//               <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             )}
//           </button>

//           <Button
//             variant="ghost"
//             className="hidden sm:inline-flex text-gray-600 dark:text-gray-300 hover:text-[#008055]"
//             style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
//             onClick={() => navigate("/signin")}
//           >
//             Sign In
//           </Button>

//           <Button
//             className="bg-[#008055] hover:bg-[#0A6647] active:bg-[#124E3B] text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
//             style={{ fontFamily: "Balto Book, Inter, sans-serif" }}
//             onClick={() => navigate("/signup")}
//           >
//             Get Started
//           </Button>
//         </div>
//       </div>
//     </div>
//   </header>
// );
