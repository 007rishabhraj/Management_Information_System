import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./components/SignupPage/Signup";
import LoginPage from "./components/LoginPage/LoginPage";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import ComplainForm from "./components/ComplainForm/ComplainForm";
import axios from "axios";
import AuthProvider from "./store/AuthProvider";
import { Outlet } from "react-router-dom";

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
      {path:"/",element:<Home/>},
      { path: "profile", element: <Profile /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {path:"complain",element:<ComplainForm/>}
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
