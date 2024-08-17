import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Canvas from "./pages/Canvas.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/canvas/:id" element={<Canvas />} />
        <Route path="*" element={<>Error 404</>} />
      </Routes>
    </Router>
  );
}

export default App;
