import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Navbar.css";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use the current location path as the initial active link
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const handleLinkClick = (path: string) => {
    setActiveLink(path); 
    navigate(path); 
  };

  return (
    <div className="navbar-container">
      <div className="navbar-container__title">
        <h1>
          TWCT<span>.</span>
        </h1>
      </div>
      <div className="navbar-container__menus">
        <a
          className={activeLink === "/" ? "active" : ""}
          onClick={() => handleLinkClick("/")}
        >
          Home
        </a>
        <a
          className={activeLink === "/watchlist" ? "active" : ""}
          onClick={() => handleLinkClick("/watchlist")}
        >
          My watchlist
        </a>
      </div>
    </div>
  );
};
