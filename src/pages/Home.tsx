import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCamera, FiMessageSquare, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }
    navigate("/chat");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://source.unsplash.com/1600x900/?artificial-intelligence"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              AI Vision Analysis
              <span className="text-blue-400 block">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Upload images and get instant AI-powered analysis
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full
                        font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
              <FiArrowRight />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Simple steps to get started with AI analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCamera className="w-8 h-8" />,
                title: "Upload Image",
                description: "Upload any image you want to analyze",
              },
              {
                icon: <FiMessageSquare className="w-8 h-8" />,
                title: "AI Analysis",
                description: "Get instant AI-powered analysis and insights",
              },
              {
                icon: <FiArrowRight className="w-8 h-8" />,
                title: "Take Action",
                description: "Use the insights to make informed decisions",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl hover:shadow-xl transition-all
                          transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://source.unsplash.com/1600x900/?technology,future"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/90 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already using our AI-powered
            analysis
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full
                      font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Free Trial
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
