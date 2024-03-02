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
import AllNotificationPage from "./pages/AllNotificationsPage"
// import BookedTeachers from "./pages/BookedTeachers";
// import SingleTeacherBooked from "./pages/SingleTeacherBooked";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import EditTeacher from "./pages/EditTeacher";
import PostPage from "./pages/PostPage";
import CompleteLessonsPage from "./components/CompletedLessons";
import UpcomingLessonsPage from "./components/UpcomingLesson";
import PendingLessonsPage from "./components/PendingLesson";
import ReadPost from "./pages/ReadPost";
import CreatedEvents from "./pages/CreatedEvent";
import AddScorePage from "./pages/AddScorePage";
import ProfilePage from "./pages/Profile";
import { useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PostContext } from "./contexts/PostsContext";
import { SingleEventsContext } from "./contexts/EventContext";
import { SingleTeamsContext } from "./contexts/TeamContext";

function App() {
const params = useParams();

  const action = useNavigationType();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    const tokenExpirationTime = 24 * 60 * 60 * 1000; 

    if (token && tokenTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - parseInt(tokenTimestamp) > tokenExpirationTime) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        localStorage.removeItem('nickName');
        localStorage.removeItem('teacher_id');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('score');
        localStorage.removeItem('par');
      }
    }
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
                      case "/completed-lesson":
                        title = "";
                        metaDescription = "";
                        break;
                        case "/upcomming-lesson":
                          title = "";
                          metaDescription = "";
                          break;
                          case "/pending-lesson":
                            title = "";
                            metaDescription = "";
                            break;
                            case "/created-events":
                              title = "";
                              metaDescription = "";
                              break;
                              case "/edit-team":
                                title = "";
                                metaDescription = "";
                                break;
                                case "/notification-page":
                                  title = "";
                                  metaDescription = "";
                                  break;
                                  case "/add-score-page":
                                    title = "";
                                    metaDescription = "";
                                    break;
                                    case "/profile-page":
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
  var [token, setToken] = useState<any>();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);    
    }
  });

  useEffect(() => {
    const tch = localStorage.getItem('teacher_id')  
    const checkTeacher = tch && tch !== 'null' ? true : false;
    setIsTeacher(checkTeacher)

  })  
  if( token === "undefined"){
    token = false;
  }
  return (
    <ToastProvider iconColor="white" textColor="white">
    <div className="">
      <Header />
      <SideIconMenu />
      <Routes>
        <Route path="/"
                  element={<EventMainPage/>} index/>
        <Route
          path="/ongoing-indiviual-score"
          
          element={token? <OngoingIndiviualScore/> :<LoginPage />}
        />
      
        <Route path="/event-main-page" element={<EventMainPage/>} />
        <Route path="/activties-page" element={token? <ActivtiesPage /> :<LoginPage />} />
        <Route path="/teacher-page" element={token ? isTeacher ? <TeacherPage /> : <CreateTeacher/> :<LoginPage/> } />
        <Route path="/student-page" element={ <StudentPage />} />
        <Route path="/create-event"  element={token? <CreateEvent/>:<LoginPage />} />
        <Route path="/score-board" element={<ScoreBoard/>} />
        <Route path="/login-page"  element={<LoginPage  />} />
        <Route path="/register-page" element={<RegisterPage/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/pay-now/:id" element={token? <PaymentForm onSubmit={(values) => console.log(values)} /> :<LoginPage /> } />
        <Route path="/booked-mark" element= {token? <BookMarkedEvents /> :<LoginPage />}  />
        <Route path="/joined-events" element= {token? <JoinedEvents /> :<LoginPage />} />
        <Route path="/create-teacher" element={token  || token !== "undefined" ? <CreateTeacher /> :<LoginPage />} /> 
     
        <Route path="/edit-teacher" element={token? <EditTeacher /> :<LoginPage />} />
        <Route path="/teacher-profile-page" element={<TeacherProfilePage   />} />
        <Route path="/post-page" element={<PostContext> <PostPage   /></PostContext>} />
        <Route path="/completed-lesson" element={token || token === "undefined" ? <CompleteLessonsPage /> :<LoginPage />} />
        <Route path="/upcomming-lesson" element={token? <UpcomingLessonsPage /> :<LoginPage />} />
        <Route path="/pending-lesson" element={token? <PendingLessonsPage /> :<LoginPage />} />
        <Route path="/created-events" element={token? <CreatedEvents /> :<LoginPage />} />
        <Route path="/notification-page" element={token? <AllNotificationPage /> :<LoginPage />} />
        <Route path="/profile-page" element={token? <ProfilePage /> :<LoginPage />} />
        <Route
          path="/edit-team/:id"
          element={<SingleTeamsContext> <SingleEventsContext> <EditTeamPage  /> </SingleEventsContext> </SingleTeamsContext>}
        />
        <Route path="/add-score-page/:id" 
          element={ 
          <SingleTeamsContext> 
            <SingleEventsContext > <AddScorePage /> </SingleEventsContext></SingleTeamsContext>} 
        />
        <Route
          path="/read-post/:id"
          element={token ? <ReadPost  /> : <LoginPage />}
        />

      </Routes>
    </div>
    </ToastProvider>
  );

}
export default App;
