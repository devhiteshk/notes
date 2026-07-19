import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Canvas from "./pages/Canvas.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import Project from "./pages/Project.jsx";
import ProtectedRoute from "./auth.jsx";
import Error404 from "./Error404.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Auth — OAuth only, no separate signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        {/* OAuth callback — reads token from URL hash and redirects to dashboard */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/canvas/:id"
          element={<ProtectedRoute element={<Canvas />} />}
        />
        <Route
          path="/folder/:id"
          element={<ProtectedRoute element={<Project />} />}
        />
        {/* Legal */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
