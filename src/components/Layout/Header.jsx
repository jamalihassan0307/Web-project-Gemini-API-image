import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

function Header({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        ☰
      </button>
      <div className="user-info">
        {user && <span>Welcome, {user.username}</span>}
      </div>
    </header>
  );
}

export default Header;
