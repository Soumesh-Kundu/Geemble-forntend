import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDailogAtom } from "./store/DailogStore";
import {
  CreatePost,
  EditProfile,
  ForgetPassword,
  Home,
  Login,
  NewPassword,
  Post,
  Register,
  Search,
  UserProfile,
  Verify,
  Feed,
  NotFound,
} from "./pages";
import ConfirmationDailog from "./components/ConfirmationDailog";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const [{ isNotConfirmed }] = useDailogAtom();

  return (
    <div id="supreme">
      <Router>
        <ScrollToTop>
          <div className="App overflow-x-hidden w-screen h-screen primary-gradient font-mukta">
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="" element={<Feed />} />
                <Route path="profile/:username" element={<UserProfile />} >
                  
                </Route>
                <Route path="editprofile/:username" element={<EditProfile />} />
                <Route path="search" element={<Search />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify/user" element={<Verify />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/newpassword" element={<NewPassword />} />
            </Routes>
          </div>
        </ScrollToTop>
      </Router>
      {isNotConfirmed && <ConfirmationDailog />}
    </div>
  );
}

export default App;
