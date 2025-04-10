import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import StudyForm from "./components/CreateStudy/StudyForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<StudyForm />} />
      </Routes>
    </Router>
  );
}

export default App;