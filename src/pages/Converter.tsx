import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calculator,
  RefreshCw,
  TrendingUp,
  User,
  LogOut,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { currencyService } from "../services";
import type { CurrencyConversionResponse } from "../services";

const Converter: React.FC = () => {
  const [soles, setSoles] = useState<string>("");
  const [dollars, setDollars] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [currentExchangeRate, setCurrentExchangeRate] = useState<number>(3.8);
  const [error, setError] = useState<string>("");
  const [conversionHistory, setConversionHistory] = useState<
    CurrencyConversionResponse[]
  >([]);

  const { user, isAuthenticated, logout } = useAuth();

  // Cargar el tipo de cambio actual al montar el componente
  useEffect(() => {
    loadCurrentExchangeRate();
  }, []);

  // Cargar el tipo de cambio actual desde el backend
  const loadCurrentExchangeRate = async () => {
    try {
      setIsRefreshing(true);
      setError("");
      const rate = await currencyService.getExchangeRate();
      setCurrentExchangeRate(rate);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading exchange rate:", error);
      setError("Failed to load current exchange rate. Using default rate.");
      // Mantener el tipo de cambio por defecto en caso de error
    } finally {
      setIsRefreshing(false);
    }
  };

  // Convertir soles a dólares usando el backend
  const convertSolesToDollars = async (solesValue: string) => {
    if (!solesValue || isNaN(Number(solesValue))) {
      setDollars("");
      return;
    }

    try {
      setIsCalculating(true);
      setError("");
      const solesNum = parseFloat(solesValue);
      const result = await currencyService.convertSolesToDollars(solesNum);

      setDollars(result.convertedAmount.toFixed(2));
      setCurrentExchangeRate(result.exchangeRate);
      setLastUpdated(new Date());

      // Agregar a la historia de conversiones
      setConversionHistory((prev) => [result, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Failed to convert currency. Please try again.");
      // Fallback al cálculo local
      const solesNum = parseFloat(solesValue);
      const dollarsResult = (solesNum / currentExchangeRate).toFixed(2);
      setDollars(dollarsResult);
    } finally {
      setIsCalculating(false);
    }
  };

  // Handle soles input change
  const handleSolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSoles(value);
    if (value) {
      convertSolesToDollars(value);
    } else {
      setDollars("");
    }
  };

  // Clear all inputs
  const handleClear = () => {
    setSoles("");
    setDollars("");
    setError("");
  };

  // Refresh exchange rate from backend
  const handleRefreshRate = async () => {
    await loadCurrentExchangeRate();
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-green-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Currency Converter
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/converter"
                className="text-green-600 font-medium hover:text-green-700 transition-colors"
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
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Convert Soles to Dollars
          </h1>
          <p className="text-xl text-gray-600">
            Real-time currency conversion from Peruvian Soles to US Dollars
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Exchange Rate Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Current Exchange Rate
              </h3>
              <p className="text-2xl font-bold">
                {currentExchangeRate.toFixed(2)} Peruvian Soles = 1 US Dollar
              </p>
            </div>
            <button
              onClick={handleRefreshRate}
              disabled={isRefreshing}
              className="bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-lg disabled:opacity-50"
              aria-label="Refresh exchange rate"
            >
              <RefreshCw
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
          <p className="text-sm text-blue-100 mt-2">
            Last updated: {formatDate(lastUpdated)}
          </p>
        </div>

        {/* Conversion Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Soles Input */}
            <div>
              <label
                htmlFor="soles"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Peruvian Soles (PEN)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">S/</span>
                </div>
                <input
                  type="number"
                  id="soles"
                  value={soles}
                  onChange={handleSolesChange}
                  placeholder="0.00"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  step="0.01"
                  min="0"
                  disabled={isCalculating}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Enter amount in Peruvian Soles
              </p>
            </div>

            {/* Dollars Output */}
            <div>
              <label
                htmlFor="dollars"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                US Dollars (USD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">$</span>
                </div>
                <input
                  type="text"
                  id="dollars"
                  value={dollars}
                  readOnly
                  placeholder="0.00"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Converted amount in US Dollars
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isCalculating}
            >
              Clear
            </button>
            <button
              onClick={handleRefreshRate}
              disabled={isRefreshing}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isRefreshing ? "Updating..." : "Refresh Rate"}
            </button>
          </div>

          {/* Loading Indicator */}
          {isCalculating && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Converting currency...
              </div>
            </div>
          )}
        </div>

        {/* Conversion History */}
        {conversionHistory.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Recent Conversions
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conversionHistory.map((conversion, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 mb-2">
                      {conversion.originalAmount} {conversion.originalCurrency}
                    </div>
                    <div className="text-gray-500 mb-2">=</div>
                    <div className="text-lg font-semibold text-green-600 mb-2">
                      {conversion.convertedAmount.toFixed(2)}{" "}
                      {conversion.targetCurrency}
                    </div>
                    <div className="text-sm text-gray-600">
                      Rate: {conversion.exchangeRate.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                About the Exchange Rate
              </h3>
              <p className="text-blue-800 mb-3">
                Exchange rates are fetched in real-time from our backend API.
                The current rate of {currentExchangeRate.toFixed(2)} Peruvian
                Soles to 1 US Dollar is updated automatically with each
                conversion.
              </p>
              <p className="text-blue-700 text-sm">
                <strong>Note:</strong> This tool converts Peruvian Soles (PEN)
                to US Dollars (USD) using real-time exchange rates from our
                backend service.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Converter;
