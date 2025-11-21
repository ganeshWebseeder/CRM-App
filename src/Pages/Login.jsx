import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen z-10">
      {/* ---------- LEFT SIDE ---------- */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Teamwork Office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-black/60 to-gray-900/70"></div>

        <div className="relative z-10 text-center text-white px-8">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold mb-4 leading-tight"
          >
            Empower Your <br />
            <span className="text-blue-400">Digital Workspace</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg max-w-md mx-auto opacity-90"
          >
            Manage your workflow efficiently and securely — built with cutting-edge
            technology for modern professionals.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 text-sm uppercase tracking-widest text-gray-300"
          >
            <span className="border border-gray-400 px-4 py-2 rounded-full backdrop-blur-md bg-white/10">
              Powered by WebSeeder
            </span>
          </motion.div>
        </div>

        {/* Logo watermark at corner */}
        <img
          src="./WebSeederLogo.jpeg"
          alt="Watermark"
          className="absolute bottom-6 right-6 w-16 h-16 opacity-60 rounded-full"
        />
      </div>

      {/* ---------- RIGHT SIDE ---------- */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img
              src="./WebSeederLogo.jpeg"
              alt="Logo"
              className="w-24 h-24 mx-auto rounded-full shadow-md mb-3"
            />
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500">Sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
              >
                Log In
              </button>

              <button
                type="button"
                onClick={() => alert('Forgot Password clicked!')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
              >
                Forgot Password
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Secured by{" "}
            <span className="font-semibold text-blue-600">
              WebSeeder Technology
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
