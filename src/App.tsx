import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import ScoreBoard from "./pages/ScoreBoard";
import OngoingIndiviualScore from "./pages/OngoingIndiviualScore";
import OngoingTeamScore from "./pages/OngoingTeamScore";
// import OngoingEvent from "./pages/LiveScoringTable";
import StudentPage from "./pages/StudentPage"
import EventMainPage from "./pages/EventMainPage";
import Header from "./components/Header";
import ActivtiesPage from "./pages/ActivtiesPage";
import TeacherPage from "./pages/TeacherPage";
import CreateEvent from "./pages/CreateEvent"
import SideIconMenu from "./components/SideIconMenu";
import 'animate.css';
function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const [isDesktopScreen, setIsDesktopScreen] = useState(window.innerWidth > 768);
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
  
  return (
    <div className="bg-[white]  transition-colors duration-2000 animate-color-change">
      <Header />
      {isDesktopScreen && <SideIconMenu />}
      <Routes>
        <Route path="/" element={<ScoreBoard />} index />
        <Route
          path="/ongoing-indiviual-score"
          element={<OngoingIndiviualScore />}
        />
        <Route path="/student-page" element={<StudentPage  />} />
        <Route path="/ongoing-team-score" element={<OngoingTeamScore />} />
        <Route path="/event-main-page" element={<EventMainPage />} />
        <Route path="/activties-page" element={<ActivtiesPage />} />
        <Route path="/teacher-page" element={<TeacherPage />} />
        <Route path="/student-page" element={<StudentPage />} />
        <Route path="/create-event" element={<CreateEvent/>} />
      </Routes>
    </div>
  );
}
export default App;
