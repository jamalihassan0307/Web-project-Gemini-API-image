import { Link } from "react-router-dom";
import { FiHome, FiMessageSquare, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen">
      <nav className="mt-5 px-2">
        <Link
          to="/welcome"
          className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <FiHome className="mr-3 h-6 w-6" />
          Home
        </Link>
        <Link
          to="/chat"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <FiMessageSquare className="mr-3 h-6 w-6" />
          Chat
        </Link>
        <Link
          to="/settings"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <FiSettings className="mr-3 h-6 w-6" />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
