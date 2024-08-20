import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Canvas from "./pages/Canvas.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import Project from "./pages/Project.jsx";
import ProtectedRoute from "./auth.jsx";
import Error404 from "./Error404.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
        <Route path="*" element={<Error404/>} />
      </Routes>
    </Router>
  );
}

export default App;
