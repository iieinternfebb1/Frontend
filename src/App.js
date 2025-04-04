import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/CandidateRegister.js";
import Login from "./components/CandidateLogin.js";
import Home from "./components/Home";
import CandidateProfile from "./components/CandidateProfile.js";
import AvailableTests from "./components/AvailableTests.js";
import ResultPage from "./components/ResultPage.js";
import AdminQuestion from "./components/AdminQuestion.js"; // Import Admin Question component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CandidateRegister" element={<Register />} />
        <Route path="/CandidateLogin" element={<Login />} />
        <Route path="/CandidateProfile" element={<CandidateProfile />} />
        <Route path="/available-tests" element={<AvailableTests />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/adminq" element={<AdminQuestion />} /> {/* Admin Question Route */}
      </Routes>
    </Router>
  );
}

export default App;



