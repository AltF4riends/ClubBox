import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContextProvider } from "./components/RegisterPagePD/AuthContextAlpha";
import { ImageProvider } from "./components/ImageContext";
import LoginPage from "./components/LoginPage";
import ForgottenPasswordPage from "./components/ForgottenPasswordPage";
import PasswordQuestionPage from "./components/ForgottenPasswordPage/PasswordQuestionPage";
import RegisterForm from "./components/RegisterForm";

import Dashboard from "./components/Dashboard";
import ForgotPasswordQNA from "./components/RegisterPagePD/ForgotPasswordQNA";
import AdditionalInfo from "./components/RegisterPagePD/AdditionalInfo";
import AboutMe from "./components/RegisterPagePD/AboutMe";
import UploadPhoto from "./components/RegisterPagePD/UploadPhoto";
import UploadVideo from "./components/RegisterPagePD/UploadVideo";
import EditPersonalDetailsPage from "./components/EditPersonalDetailsPage";
import ManageClub from "./components/ManageClub";

import EditClubInfo from "./components/EditClubInfo";
import ClubAnnouncement from "./components/Club_Admission/ClubAnnouncement";
import FaqPage from "./components/FaqPage/FaqMainPage";
import FaqMainPage from "./components/FaqPage/FaqMainPage";

import Calendar from "./components/CalendarComp";
import CalendarMain from "./components/CalendarPage/CalendarMain";
import NewEvent from "./components/CreateEvent/NewEvent";
import NewEventComp from "./components/NewEventComp";
import NewClubComp from "./components/NewClubComp";
import ClubStatisticPage from "./components/ClubStatisticPage";
import CalendarComp from "./components/CalendarComp";
import ProfilePage from "./components/ProfilePage";
import ClubAdmission from "./components/Club_Admission/ClubAdmission";
import CreateEvents from "./components/CreateEvents";
import ClubPage from "./components/Club_Admission/ClubPage";
import Admissionlist from "./components/Club_Admission/Admissionlist";

import AddInfoPage from "./components/AddInfoPage";
import CartPage from "./components/PaymentPage/CartPage";
import NewStatistic from "./components/Statistics/NewStatistic";
import ViewEvent from "./components/EventPage/ViewEvent";
import PaymentPage from "./components/PaymentPage/PaymentPage";
function App() {
  return (
    <AuthContextProvider>
      <ImageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgotpassword" element={<ForgottenPasswordPage />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route
              path="/password_questions"
              element={<PasswordQuestionPage />}
            />
            <Route path="/faqpage" element={<FaqMainPage />} />
            <Route path="/clubstatistic" element={<ClubStatisticPage />} />
            <Route path="/newstatistic" element={<NewStatistic />} />
            <Route path="/createevents" element={<CreateEvents />} />
            <Route path="/Club_Admission" element={<ClubAdmission />} />

            <Route path="/event/:id" element={<ViewEvent />} />
            <Route
              path="/register_page"
              element={<RegisterForm></RegisterForm>}
            />

            {/* <Route
              path="/forget_password_qna"
              element={<ForgotPasswordQNA />}
            /> */}
            <Route path="/additional_info" element={<AddInfoPage />} />
            <Route
              path="/about_me"
              element={
                <AboutMe
                  aboutMe=""
                  updateFields={function (
                    fields: Partial<{ aboutMe: String }>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
            {/* <Route path="/upload_photo" element={<UploadPhoto />} />
            <Route path="/upload_video" element={<UploadVideo />} /> */}
            <Route
              path="/edit-personal-details"
              element={<EditPersonalDetailsPage />}
            />
            <Route path="/Clubs" element={<ClubPage />} />
            <Route path="/Cart" element={<CartPage />} />
<<<<<<< HEAD
            <Route path="/payment_page" element={<PaymentPage />} />
=======
            <Route path="/payment_page" element={<PaymentPage/>}/>
            <Route path="/Admissionlist" element={<Admissionlist />} />
>>>>>>> ccbfb1d3bc61df145ce8a1a470b5d203720fc241

            <Route path="/manage_club/:id" element={<ManageClub />} />

            <Route path="/edit_club_info/:id" element={<EditClubInfo />} />
            <Route
              path="/make_club_announcement"
              element={<ClubAnnouncement />}
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/CalendarMain" element={<CalendarComp />} />
            <Route path="/NewEventComp" element={<NewEventComp />} />
            <Route path="/NewClubComp" element={<NewClubComp />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ImageProvider>
    </AuthContextProvider>
    //guukug
  );
}

export default App;
