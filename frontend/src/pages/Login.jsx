import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios"; // assuming you have this set up


function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
        if (isSignup) {

      // Confirm password validation
      if (form.password !== form.confirm) {
        alert("Passwords do not match!");
        return;
      }

      const username = form.email.split("@")[0];

      const _res = await api.post("/auth/signup", {
        full_name: username,
        email: form.email,
        password: form.password,
      });

      alert("Signup successful!");

      localStorage.setItem("user_name", username);
      localStorage.setItem("user_email", form.email);

      setIsSignup(false);
      navigate("/login");

      } 
      else {
      // Login flow
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { access_token } = res.data;
      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("user_email", form.email);
      // force navbar update
      window.dispatchEvent(new Event("storage"));
      alert("Login successful!");

      const redirect = new URLSearchParams(location.search).get("redirect") || "/";
      navigate(redirect);
    }
  } catch (err) {
  const message =
    err.response?.data?.detail ||
    err.response?.data?.message ||
    err.message ||
    "Unexpected error";

  alert("Auth failed: " + message);
}

};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Auth Card */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white shadow-md rounded-2xl p-8 w-[90%] max-w-md border border-gray-200">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-1">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 mb-6">
            {isSignup
              ? "Sign up to get started with ResumeAI Pro"
              : "Sign in to continue your journey"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm Password
                </label>
                <input
                type="password"
                name="confirm"
                value={form.confirm}          // <-- connect to state
                onChange={handleChange}       // <-- update state on typing
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              </div>
            )}

            <button
              type="submit"
              disabled={isSignup && form.password !== form.confirm}   // <-- NEW LINE
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-600 mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
