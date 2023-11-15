import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { FormPageContext } from "./contexts/FormPageContext";
import { useState } from 'react';

import LoginPage from "./components/LoginPage";
import ForgottenPasswordPage from "./components/ForgottenPasswordPage";
import PasswordQuestionPage from "./components/ForgottenPasswordPage/PasswordQuestionPage";
import RegisterForm from "./components/RegisterPagePD/RegisterForm";

import Dashboard from "./components/Dashboard";
import RegisterForm from "./components/RegisterPagePD/RegisterForm";


const initRegPage = () =>
{
  const [regPage, setRegPage] = useState(0);

  return (
    <div>
     <FormPageContext.Provider value={{regPage, setRegPage}}>
     <RegisterForm/>
     </FormPageContext.Provider>
    </div>
   )
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgottenPasswordPage />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/password_questions" element={<PasswordQuestionPage />} />

        <Route path="/register_page" element={initRegPage()} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    //guukug
  );
}

export default App;
