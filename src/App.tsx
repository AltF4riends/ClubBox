import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { FormPageContext } from "./contexts/FormPageContext";
import { useState } from "react";

import LoginPage from "./components/LoginPage";
import ForgottenPasswordPage from "./components/ForgottenPasswordPage";
import PasswordQuestionPage from "./components/ForgottenPasswordPage/PasswordQuestionPage";
import RegisterForm from "./RegisterForm";

import Dashboard from "./components/Dashboard";
import ForgotPasswordQNA from "./components/RegisterPagePD/ForgotPasswordQNA";
import AdditionalInfo from "./components/RegisterPagePD/AdditionalInfo";
import AboutMe from "./components/RegisterPagePD/AboutMe";
import UploadPhoto from "./components/RegisterPagePD/UploadPhoto";
import UploadVideo from "./components/RegisterPagePD/UploadVideo";

const initRegPage = () => {
  const [regPage, setRegPage] = useState(0);

  return (
    <div>
      <FormPageContext.Provider value={{ regPage, setRegPage }}>
        <RegisterForm />
      </FormPageContext.Provider>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgottenPasswordPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/password_questions" element={<PasswordQuestionPage />} />

        <Route path="/register_page" element={initRegPage()} />
        <Route path="/forget_password_qna" element={<ForgotPasswordQNA/>} />
        <Route path="/additional_info" element={<AdditionalInfo/>} />
        <Route path="/about_me" element={<AboutMe/>} />
        <Route path="/upload_photo" element={<UploadPhoto/>} />
        <Route path="/upload_video" element={<UploadVideo/>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    //guukug
  );
}

export default App;
