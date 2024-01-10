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
import { ToastProvider } from './utils/ToastProvider';
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
import EditTeamPage from "./pages/EditTeamPage";
import PaymentForm from "./pages/PaymentForm"
import 'animate.css';
import PrivateRoute from "./utils/PrivateRoute";
import BookMarkedEvents from "./pages/BookMarkedEvents"
import JoinedEvents from "./pages/JoinedEvents"
import CreateTeacher from "./pages/CreateTeacher"
// import BookedTeachers from "./pages/BookedTeachers";
// import SingleTeacherBooked from "./pages/SingleTeacherBooked";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import EditTeacher from "./pages/EditTeacher";
import PostPage from "./pages/PostPage";
function App() {
  const action = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isDesktopScreen, setIsDesktopScreen] = useState(window.innerWidth > 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false)

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
              case "/edit-team-page":
              title = "";
              metaDescription = "";
              break;
              case "/pay-now":
              title = "";
              metaDescription = "";
              break;
              case "/booked-mark":
                title = "";
                metaDescription = "";
                break;
                case "/joined-events":
                  title = "";
                  metaDescription = "";
                  break;
                  case "/create-teacher":
                    title = "";
                    metaDescription = "";
                    break;
                    case "/edit-teacher":
                    title = "";
                    metaDescription = "";
                    break;
                    case "/teacher-profile-page":
                    title = "";
                    metaDescription = "";
                    break;
                    case "/post-page":
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
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);    }
  });

  useEffect(() => {
    const tch = localStorage.getItem('teacher_id')
    const checkTeacher = tch && tch !== 'null' ? true : false;
    setIsTeacher(checkTeacher)
    console.log(checkTeacher, 'sdsd')

  })  

  return (
    <ToastProvider iconColor="white" textColor="white">
    <div className="bg-[white]  transition-colors duration-2000 animate-color-change">
      <Header />
      {isDesktopScreen &&  <SideIconMenu />}
      <Routes>
        <Route path="/"
                  element={<EventMainPage/>} index/>
        <Route
          path="/ongoing-indiviual-score"
          
          element={token? <OngoingIndiviualScore/> :<LoginPage />}
        />
        <Route path="/student-page" element={token? <StudentPage  />:<LoginPage />} />
        <Route path="/event-main-page" element={<EventMainPage/>} />
        <Route path="/activties-page" element={token? <ActivtiesPage /> :<LoginPage />} />
        <Route path="/teacher-page" element={token ? isTeacher ? <TeacherPage /> : <CreateTeacher/> :<LoginPage/> } />
        <Route path="/student-page" element={token? <StudentPage />:<LoginPage />} />
        <Route path="/create-event"  element={token? <CreateEvent/>:<LoginPage />} />
        <Route path="/score-board" element={token? <ScoreBoard/>:<LoginPage />} />
        <Route path="/login-page"  element={<LoginPage  />} />
        <Route path="/register-page" element={<RegisterPage/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/edit-team-page" element={<EditTeamPage    />} />
        <Route path="/pay-now" element={<PaymentForm  onSubmit={(values) => console.log(values)}/>} />
        <Route path="/booked-mark" element={<BookMarkedEvents   />} />
        <Route path="/joined-events" element={<JoinedEvents   />} />
        <Route path="/create-teacher" element={<CreateTeacher   />} />
     
        <Route path="/edit-teacher" element={<EditTeacher   />} />
        <Route path="/teacher-profile-page" element={<TeacherProfilePage   />} />
        <Route path="/post-page" element={<PostPage   />} />
      </Routes>
    </div>
    </ToastProvider>
  );

}
export default App;
