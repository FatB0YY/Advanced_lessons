import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import AboutPage from "../pages/AboutPage";
import NotFound from "../pages/NotFound";
import User from "../components/User";
import UserDetailsPage from "../pages/UserDetailsPage";
import HelloWorld from "../pages/HelloWorld";
import User2 from "../components/User2ForTest";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/hello" element={<HelloWorld />} />
      <Route path="/user-test" element={<User2 />} />

      <Route path="/about" element={<AboutPage />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/:id" element={<UserDetailsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
