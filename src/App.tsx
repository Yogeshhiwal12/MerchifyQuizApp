import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import QuizDetail from "./components/QuizDetail";
import QuizAttempt from "./components/QuizAttempt";
import QuizResult from "./components/QuizResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizDetail />} />
        <Route path="/quiz-attempt" element={<QuizAttempt />} />
        <Route path="/quiz-result" element={<QuizResult />} />
      </Routes>
    </Router>
  );
}

export default App;
