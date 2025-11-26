import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const scrollToSection = (id) => {
//   if (window.location.pathname !== "/") {
//     navigate("/");
//     setTimeout(() => {
//       document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     }, 500);
//   } else {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   }
// };


  // Check login state from localStorage
useEffect(() => {
  function updateLoginState() {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }

  updateLoginState(); // run first time

  // listen for login/logout updates
  window.addEventListener("storage", updateLoginState);
  return () => window.removeEventListener("storage", updateLoginState);
}, []);




  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    navigate("/");
  };

const handleBuildResume = () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    // Not logged in → go to login with redirect
    navigate("/login?redirect=/builder/templates");
  } else {
    // Logged in → go directly to builder
    navigate("/builder/templates");
  }
};




  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-poppins font-bold text-gray-900 cursor-pointer"
        >
          Resume<span className="text-blue-600">AI</span> Pro
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/#features")}
                className="hover:text-blue-600 transition"
              >
                Features
              </button>
              <button
                onClick={() => navigate("/#plans")}
                className="hover:text-blue-600 transition"
              >
                Plans
              </button>
              <button
                onClick={() => navigate("/#help")}
                className="hover:text-blue-600 transition"
              >
                Help
              </button>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-blue-600 transition"
              >
                Log In
              </button>
            <button
              onClick={handleBuildResume}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition font-semibold"
            >
              Build My Resume
            </button>


            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="hover:text-blue-600 transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/builder/templates")}
                className="hover:text-blue-600 transition"
              >
                Templates
              </button>
              <button
                onClick={() => navigate("/support")}
                className="hover:text-blue-600 transition"
              >
                Support
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-sm transition font-semibold"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
