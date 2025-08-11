import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  DollarSign,
  TrendingUp,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Currency Converter
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/converter"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Converter
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Message for Authenticated Users */}
        {isAuthenticated && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  Welcome back, {user?.username}!
                </h3>
                <p className="text-green-700">
                  You're now logged in and can access all features.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <Calculator className="h-4 w-4 mr-2" />
            Currency Conversion Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Convert
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Soles to Dollars
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Fast, accurate, and easy-to-use currency converter. Get real-time
            exchange rates and convert Peruvian Soles to US Dollars instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/converter"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Converting
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login to Access Converter
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Access Restriction Notice */}
          {!isAuthenticated && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> The currency converter requires
                authentication. Please login to access the conversion tool.
              </p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Easy Conversion
            </h3>
            <p className="text-gray-600">
              Simple and intuitive interface for quick currency conversions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Real-time Rates
            </h3>
            <p className="text-gray-600">
              Current exchange rate: 3.8 Soles = 1 US Dollar.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              User Accounts
            </h3>
            <p className="text-gray-600">
              {isAuthenticated
                ? "You are logged in and can save your preferences."
                : "Create an account to save your conversion history."}
            </p>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Current Exchange Rate
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3.8</div>
              <div className="text-gray-600">Peruvian Soles</div>
            </div>
            <div className="text-2xl text-gray-400">=</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1.00</div>
              <div className="text-gray-600">US Dollar</div>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            This rate is updated regularly to ensure accuracy in your
            conversions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/converter"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Convert Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Login to Convert
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p className="flex items-center justify-center space-x-2">
            <span>Built with</span>
            <span className="text-red-500">❤️</span>
            <span>using React + TypeScript + Tailwind CSS</span>
          </p>
          <p className="mt-2 text-sm">
            Exchange rates are for informational purposes only
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
