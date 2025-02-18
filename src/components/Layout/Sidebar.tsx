import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiMessageSquare,
  FiImage,
  FiSettings,
  FiUser,
} from "react-icons/fi";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: <FiHome />, label: "Home" },
    { path: "/chat", icon: <FiMessageSquare />, label: "Chat" },
    { path: "/gallery", icon: <FiImage />, label: "Gallery" },
    { path: "/settings", icon: <FiSettings />, label: "Settings" },
    { path: "/profile", icon: <FiUser />, label: "Profile" },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:transform-none lg:relative
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="h-full flex flex-col">
          <div className="space-y-1 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600
                  ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                onClick={() => onClose()}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
