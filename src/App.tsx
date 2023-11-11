import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import ForgottenPasswordPage from "./components/ForgottenPasswordPage";
import PasswordQuestionPage from "./components/ForgottenPasswordPage/PasswordQuestionPage";

import NavBar from "./components/HomePage/NavBar";
import Footer from "./components/HomePage/Footer";
import Slider from "./components/HomePage/Slider";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgottenPasswordPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/password_questions" element={<PasswordQuestionPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    //guukug
  );
}

export default App;
