import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header />}

      <div className="flex">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
