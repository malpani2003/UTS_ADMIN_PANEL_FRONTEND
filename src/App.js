// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/Admin/Login";
import ChangePassword from "./components/Admin/ChangePassword";
import BlogManagement from "./components/Admin/BlogManagment";
import ContactSubmissions from "./components/Admin/ContactSubmissions";
import CareersManagement from "./components/Admin/CareersManagement";
import TestimonialManagement from "./components/Admin/TestimonialManagement";
import HomePage from "./components/Admin/HomePage";
import SliderManagement from "./components/Admin/SliderManagement";
import MainPage from "./components/Admin/MainPage";
// import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<MainPage />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="blogs" element={<BlogManagement />} />
          <Route path="contact-submissions" element={<ContactSubmissions />} />
          <Route path="home-page" element={<HomePage></HomePage>} />
          <Route path="testimonial" element={<TestimonialManagement />} />
          <Route
            path="sliders"
            element={<SliderManagement></SliderManagement>}
          />
          <Route path="careers" element={<CareersManagement />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
