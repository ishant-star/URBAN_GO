import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaShoppingBag, 
  FaEnvelope, 
  FaShoppingCart, 
  FaUser, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaClipboardList
} from 'react-icons/fa';
import Button from './Button';
import logo from '../../assets/logo.png';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('userData');
      
      if (token && user) {
        setIsAuthenticated(true);
        setUserData(JSON.parse(user));
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('cartItems');
    setIsAuthenticated(false);
    setUserData(null);
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  // Navigation items
  const navigationItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/product', label: 'Products', icon: FaShoppingBag },
    { path: '/Contact', label: 'Contact', icon: FaEnvelope },
    { path: '/summary', label: 'My Orders', icon: FaClipboardList, authRequired: true },
  ];

  // Check if current path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200' 
            : 'bg-white/90 backdrop-blur-sm'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={logo}
                alt="UrbanGo Logo"
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-8 w-8' : 'h-10 w-10'
                }`}
              />
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold text-neutral-800 group-hover:text-green-600 transition-colors">
                  Urban<span className="text-green-600">Go</span>
                </span>
                <span className="text-xs text-neutral-500 hidden sm:block">
                  Fresh Groceries
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                if (item.authRequired && !isAuthenticated) return null;
                
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg
                      transition-all duration-200 ease-in-out
                      ${isActive
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-neutral-600 hover:text-green-600 hover:bg-green-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              
              {/* Cart Icon */}
              <Link
                to="/ToCart"
                className="relative p-2 text-neutral-600 hover:text-green-600 transition-colors"
              >
                <FaShoppingCart className="w-5 h-5" />
                {/* Cart badge could be added here */}
              </Link>

              {/* Authentication */}
              <div className="hidden lg:flex items-center space-x-3">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-neutral-600">
                      Welcome, <span className="font-medium text-green-600">{userData?.name}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      leftIcon={<FaSignOutAlt />}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/login')}
                    leftIcon={<FaUser />}
                  >
                    Login
                  </Button>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-600 hover:text-green-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            lg:hidden mobile-menu-container
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen 
              ? 'max-h-screen opacity-100' 
              : 'max-h-0 opacity-0 overflow-hidden'
            }
          `}
        >
          <div className="bg-white border-t border-neutral-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              
              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => {
                if (item.authRequired && !isAuthenticated) return null;
                
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-all duration-200 ease-in-out
                      ${isActive
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-neutral-600 hover:text-green-600 hover:bg-green-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Authentication */}
              <div className="pt-4 border-t border-neutral-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2">
                      <p className="text-sm text-neutral-600">
                        Welcome, <span className="font-medium text-green-600">{userData?.name}</span>
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={handleLogout}
                      leftIcon={<FaSignOutAlt />}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                    leftIcon={<FaUser />}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className={`${isScrolled ? 'h-16 lg:h-20' : 'h-16 lg:h-20'}`} />
    </>
  );
};

export default Navigation;