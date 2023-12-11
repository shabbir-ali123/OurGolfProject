import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Routes,
  Route,
  useNavigationType,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ScoreBoard from "./pages/ScoreBoard";
import OngoingIndiviualScore from "./pages/OngoingIndiviualScore";

// import OngoingEvent from "./pages/LiveScoringTable";
import StudentPage from "./pages/StudentPage"
import EventMainPage from "./pages/EventMainPage";
import Header from "./components/Header";
import ActivtiesPage from "./pages/ActivtiesPage";
import TeacherPage from "./pages/TeacherPage";
import CreateEvent from "./pages/CreateEvent"
import SideIconMenu from "./components/SideIconMenu";
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Logout from "./pages/Logout"

import 'animate.css';
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  const action = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isDesktopScreen, setIsDesktopScreen] = useState(window.innerWidth > 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopScreen(window.innerWidth > 1300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/ongoing-indiviual-score":
        title = "";
        metaDescription = "";
        break;
      case "/score-board":
        title = "";
        metaDescription = "";
        break;
      case "/teacher-page":
        title = "";
        metaDescription = "";
        break;
      case "/event-main-page":
        title = "";
        metaDescription = "";
        break;
        case "/activties-page":
          title = "";
          metaDescription = "";
          break;
          case "/student-page":
            title = "";
            metaDescription = "";
            break;
            case "/create-event":
            title = "";
            metaDescription = "";
            break;
            case "/register-page":
            title = "";
            metaDescription = "";
            break;
            case "/login-page":
            title = "";
            metaDescription = "";
            break;
            case "/logout":
              title = "";
              metaDescription = "";
              break;

    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  const history = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if a token exists in localStorage
    const storedToken = localStorage.getItem('token');

    // If a token exists, set it in the component state
    if (storedToken) {
      setToken(storedToken);    }
  });
  const locations = useLocation();

  const isEventPage = location.pathname.startsWith("/events");
 


  return (
    <div className="bg-[white]  transition-colors duration-2000 animate-color-change">
      <Header />
      {isDesktopScreen &&  <SideIconMenu />}
      <Routes>
        <Route path="/"
                  element={token ? <ScoreBoard /> : <LoginPage />} index/>
        <Route
          path="/ongoing-indiviual-score"
          
          element={<OngoingIndiviualScore />}
        />
        <Route path="/student-page" element={token? <StudentPage  />:<LoginPage />} />
        <Route path="/event-main-page" element={token? <EventMainPage /> :<LoginPage />} />
        <Route path="/activties-page" element={token? <ActivtiesPage /> :<LoginPage />} />
        <Route path="/teacher-page" element={token? <TeacherPage />:<LoginPage />} />
        <Route path="/student-page" element={token? <StudentPage />:<LoginPage />} />
        <Route path="/create-event"  element={token? <CreateEvent/>:<LoginPage />} />
        <Route path="/score-board" element={token? <ScoreBoard/>:<LoginPage />} />
        <Route path="/login-page"  element={<LoginPage  />} />
        <Route path="/register-page" element={<RegisterPage/>} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </div>
  );

}
export default App;
