import {
   createBrowserRouter,
 } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from '../layouts/ProfileLayout';

 

export const router = createBrowserRouter([
   {
     path: "/",
     element: <LoginPage />,
   },
   {
     path: "/register",
     element: <RegisterPage />,
   },
   {
     path: "/home",
     element: <HomeLayout />,
   },
   {
     path: "/profile",
     element: <ProfileLayout />,
   },
 ]);