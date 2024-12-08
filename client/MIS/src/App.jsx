import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./components/SignupPage/Signup";
import LoginPage from "./components/LoginPage/LoginPage";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Feedback from "./components/FeedbackForm/FeedbackForm";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ComplainForm from "./components/ComplainForm/ComplainForm";
import axios from "axios";
import AuthProvider from "./store/AuthProvider";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/Admindashboard";
import AdminLogin from "./components/Adminlogin/Adminlogin";
import UserHistory from "./components/UserHistory/UserHistory";
import JeInfo from "./components/JeInfo/JeInfo";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import ReviewPage from "./components/Review/Review";
import WorkDoneForm from "./components/Review/Checkbox";
import CheckBox from "./components/Review/Checkbox";
import UserReviews from "./components/UserReviews/UserReviews";
axios.defaults.withCredentials = true;
const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "complain", element: <ComplainForm /> },
      { path: "Feedback", element: <Feedback /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "adminlogin", element: < AdminLogin/> },
      { path: "user-history", element: < UserHistory/> },
      { path: "JeInfo", element: < JeInfo/> },
      { path: "UpdateUser", element: < UpdateUser/> },
      {path: "review",element:<ReviewPage/>},
      {path:"check",element:<CheckBox/>},
      {path:"previous-reviews",element:<UserReviews/>}
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col m-0 p-0">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
