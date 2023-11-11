import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ForgottenPasswordPage from "./components/ForgottenPasswordPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgottenPasswordPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    //guukug
  );
}

export default App;
