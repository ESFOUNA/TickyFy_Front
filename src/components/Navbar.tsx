import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Ticke<span className="text-green-500">fy</span>
      </Link>

      <div className="nav-links">
        <Link to="/ticketlist">Ticket List</Link>
        <Link to="/cart">Cart</Link>
        {!user && (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {user && (
          <div ref={dropdownRef} className="profile-container">
            <img
              src={user.picture}
              alt="Profile"
              className="profile-img"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <FaChevronDown
              className="dropdown-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="flex items-center gap-2">
                  <FaUser /> Profile
                </Link>
                <Link to="/support">Support</Link>
                <button
                  onClick={handleLogout}
                  className="logout-btn text-red-600 hover:text-red-800 flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
