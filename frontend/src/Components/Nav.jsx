import React, { useState, useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";

function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("userData");
      
      if (token && user) {
        setIsAuthenticated(true);
        setUserData(JSON.parse(user));
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuthStatus();
    
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("cartItems"); // Clear cart on logout
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/");
  };

  return (
    <nav
      className={`flex fixed w-full z-50 transition-all duration-500 items-center justify-between px-4
        ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-16"
            : "bg-gradient-to-r from-black/80 via-slate-900/80 to-black/80 backdrop-blur-lg h-20"
        }`}
    >
      {/* gradient bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      {/* floating particles */}
      <div className={navbarStyles.particlesContainer}>
        <div
          className={`${navbarStyles.particle} w-24 h-24 bg-emerald-500/5 -top-12 left-1/4 ${navbarStyles.floatAnimation}`}
        />
        <div
          className={`${navbarStyles.particle} w-32 h-32 bg-green-500/5 -bottom-16 left-2/3 ${navbarStyles.floatSlowAnimation}`}
        />
        <div
          className={`${navbarStyles.particle} w-16 h-16 bg-teal-500/5 -top-8 left-3/4 ${navbarStyles.floatSlowerAnimation}`}
        />
      </div>

      {/* Left side - Logo */}
      <div className="flex items-center flex-shrink-0">
        <Link
          to="/"
          className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            className={`transition-all duration-500 ${
              scrolled ? "h-8 w-8" : "h-10 w-10"
            }`}
            src={logo}
            alt="UberGo logo"
          />
          <h1 className={navbarStyles.logoText}>
            <span className="text-2xl sm:text-3xl md:text-4xl">UberGo</span>
          </h1>
        </Link>
      </div>

      {/* Center - Navigation Links (Desktop/Tablet only) */}
      <ul className="hidden md:flex items-center space-x-6 text-lg text-white">
        <Link to="/">
          <li className="px-3 py-2 cursor-pointer hover:text-green-400 transition-all duration-300 rounded-lg hover:bg-white/10">
            Home
          </li>
        </Link>
        <Link to="/product">
          <li className="px-3 py-2 cursor-pointer hover:text-green-400 transition-all duration-300 rounded-lg hover:bg-white/10">
            Items
          </li>
        </Link>
        <Link to="/Contact">
          <li className="px-3 py-2 cursor-pointer hover:text-green-400 transition-all duration-300 rounded-lg hover:bg-white/10">
            Contact
          </li>
        </Link>
        <Link to="/summary">
          <li className="px-3 py-2 cursor-pointer hover:text-green-400 transition-all duration-300 rounded-lg hover:bg-white/10">
            My Orders
          </li>
        </Link>
      </ul>
        
      {/* Right side - Cart, Login, Hamburger */}
      <div className="flex items-center space-x-3">
        {/* Cart Icon - Always visible */}
        <Link to="/ToCart">
          <FaOpencart className="text-2xl text-white hover:text-emerald-400 transition-all duration-300 hover:scale-110"/>
        </Link>

        {/* Login/Logout - Always visible */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <span className="hidden lg:block text-sm text-emerald-400">
              Welcome, {userData?.name}!
            </span>
            <button
              onClick={handleLogout}
              className="flex group items-center cursor-pointer space-x-1 px-2 py-1 rounded-lg hover:bg-red-500/20 transition-all duration-300"
            >
              <BiLogOut className="text-xl text-teal-50 group-hover:text-red-400 transition-all duration-300" />
              <span className="hidden lg:block text-sm text-teal-50 group-hover:text-red-400 transition-all duration-300">
                Logout
              </span>
            </button>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex group items-center space-x-1 px-2 py-1 rounded-lg hover:bg-emerald-500/20 transition-all duration-300">
              <GoPerson className="text-xl text-teal-50 group-hover:text-emerald-400 transition-all duration-300" />
              <span className="hidden lg:block text-sm text-teal-50 group-hover:text-emerald-400 transition-all duration-300">
                Login
              </span>
            </div>
          </Link>
        )}

        {/* Hamburger Menu - Mobile only */}
        <button
          className="md:hidden p-2 text-2xl text-green-300 transition-all hover:scale-110 hover:bg-white/10 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-48 sm:w-56 bg-black/95 backdrop-blur-lg shadow-2xl md:hidden border-l border-emerald-500/30 rounded-bl-2xl">
          <ul className="flex flex-col py-4 text-white font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <li className="px-6 py-3 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-300 border-b border-emerald-800/30 delay-100">
                Home
              </li>
            </Link>
            <Link to="/product" onClick={() => setMenuOpen(false)}>
              <li className="px-6 py-3 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-300 border-b border-emerald-800/30 delay-200">
                Items
              </li>
            </Link>
            <Link to="/Contact" onClick={() => setMenuOpen(false)}>
              <li className="px-6 py-3 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-300 border-b border-emerald-800/30 delay-500">
                Contact
              </li>
            </Link>
            <Link to="/summary" onClick={() => setMenuOpen(false)}>
              <li className="px-6 py-3 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-300 delay-1000">
                My Orders
              </li>
            </Link>
          </ul>
        </div>
      )}
      
    </nav>
  );
}

export default Nav;
