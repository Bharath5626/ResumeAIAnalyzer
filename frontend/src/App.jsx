import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ATSUpload from "./pages/ATSUpload";

// Resume Builder Flow
import TemplateSelection from "./pages/TemplateSelection";
import Contact from "./pages/Builder/Contact";
import Experience from "./pages/Builder/Experience";
import Education from "./pages/Builder/Education";
import Certifications from "./pages/Builder/Certifications";
import Skills from "./pages/Builder/Skills";
import Summary from "./pages/Builder/Summary";
import Finalize from "./pages/Builder/Finalize";

// Logged-In Area
import Dashboard from "./pages/Dashboard";
import Support from "./pages/Support";
import SavedResumes from "./pages/SavedResumes";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ats" element={<ATSUpload />} />

      {/* Resume Builder */}
      <Route path="/builder/templates" element={<TemplateSelection />} />
      <Route path="/builder/contact" element={<Contact />} />
      <Route path="/builder/experience" element={<Experience />} />
      <Route path="/builder/education" element={<Education />} />
      <Route path="/builder/certifications" element={<Certifications />} />
      <Route path="/builder/skills" element={<Skills />} />
      <Route path="/builder/summary" element={<Summary />} />
      <Route path="/builder/finalize" element={<Finalize />} />

      {/* Logged-In Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/support" element={<Support />} />
      <Route path="/saved-resumes" element={<SavedResumes />} />
    </Routes>
  );
}

export default App;
