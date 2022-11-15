import { useState, useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { BlogForm } from "./components/BlogForm";
import { Notification } from "./components/Notification";
import { Togglable } from "./components/Togglable";
import { NotFound } from "./components/NotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import "./App.css";

const App = () => {
  //return user !== null ? blogRelatedComponent() : loginRelatedComponent()

  const Menu = () => {
    let activeStyle = {
      color: "#555",
      textDecoration: "underline",
    };

    return (
      <>
        <nav className="menu-nav">
          <NavLink
            to="login"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Login
          </NavLink>
          {/*  <NavLink
            to="signup"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Signup
          </NavLink>
          <NavLink
            to="about"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            about
          </NavLink> */}
        </nav>
      </>
    );
  };

  return (
    <Router>
      <div className="section">
        <div className="container">
          <header>
            <h1>
              <Link to="/">BlogList</Link>
            </h1>
            <Menu />
          </header>
          <main>
            <Notification />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
