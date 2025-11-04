import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials (you can replace with your API later)
    if (email === "admin@example.com" && password === "admin123") {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="w-1/2 relative hidden md:flex items-center justify-center bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Office Work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white text-center px-8">
          <h1 className="text-4xl font-bold mb-4">Secure Access</h1>
          <p className="text-lg">
            Your data is protected with enterprise-grade security
          </p>
        </div>
      </div>

      {/* Right Side with Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <div className="text-center mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="Logo"
              className="w-16 h-16 mx-auto mb-2"
            />
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-500">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Secured by{" "}
            <span className="font-semibold">WebSeeder Technology</span>
          </p>
        </div>
      </div>
    </div>
  );
}
