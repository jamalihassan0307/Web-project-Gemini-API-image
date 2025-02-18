import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Welcome() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Welcome, {user?.username}!
        </h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          Get started with AI Vision Assistant
        </p>
        <div className="mt-5 flex justify-center">
          <Link
            to="/chat"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Start Chatting
          </Link>
        </div>
      </div>
    </div>
  );
}
