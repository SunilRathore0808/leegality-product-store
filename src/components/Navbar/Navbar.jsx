import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";
import { IoIosSearch } from "react-icons/io";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Filters"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <span className="search-icon">
            <IoIosSearch />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="nav-search-input"
          />
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-icon-btn" aria-label="Cart">
          <FaShoppingCart />
        </button>
        <button className="nav-icon-btn" aria-label="History">
          🕒
        </button>
        <button className="nav-icon-btn profile-icon" aria-label="Profile">
          <CgProfile />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
