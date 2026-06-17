
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./pages/resumeAllPages/Dashboard";
import TemplateList from "./pages/resumeAllPages/TemplateList";
//import ResumeBuilder from "./pages/resumeAllPages/ResumeBuilder";
import Register from "./pages/auth/RegisterUser";
import Login from "./pages/auth/LoginUser";
import Home from "./pages/dashboard/Home3";
import AppDetail from "./about/AppDetail";
import Feedback from "./Feedback/FeedBackl";
//import Templates from "./pages/dashboard/Templates";
//import English from "./pages/English";
import UserProfile from "./pages/auth/UserProfile";

import ResumeBuilder from "./pages/resumeAllPages/ResumeBuilder";
import ResumeViewPage from "./pages/resumeAllPages/ResumeViewPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  {/* Auth routes */},
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/profile", element: <UserProfile /> },
 
    {/* Resume routes */},
  { path: "/templates/:category", element: <TemplateList /> },
  { path: "/resume-builder/:slug", element: <ResumeBuilder /> },
   {path: "/resume-view/:category/:slug/:id",element: <ResumeViewPage />},
  { path: "/about", element: <AppDetail /> },
  { path: "/review", element: <Feedback /> },
  //{ path: "/templates", element: <Templates /> },
  //{ path: "/english", element: <English /> },

  
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;