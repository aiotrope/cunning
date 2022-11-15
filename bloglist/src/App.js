import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
} from "react-router-dom";
import { Signup } from "./features/user/Signup";
import { Login } from "./features/user/Login";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import { userSelector, logout } from "./features/user/userSlice";
import { store } from "./app/store";

import "./_App.scss";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const { username, isLoggedIn } = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      <Navigate to="/login" />;
    }
  }, [isLoggedIn]);

  const onLogout = useCallback(() => {
    dispatch(logout());
    //localStorage.removeItem('persist:root')
  }, [dispatch]);

  console.log("AFTER Logout", store.getState());
  return (
    <Router>
      <div className="container">
        <header className="header">
          <div>
            <h1>
              <Link to={"/"}>Blog List</Link>
            </h1>
          </div>
          <nav className="menu-nav">
            <div>
              {isLoggedIn ? (
                <>
                  <NavLink to={"/"}>Home</NavLink>
                  <a href="/login" onClick={onLogout}>
                    Logout
                  </a>
                </>
              ) : (
                <>
                  <NavLink to={"/login"}>Login</NavLink>
                  <NavLink to={"/signup"}>Signup</NavLink>
                </>
              )}
            </div>
          </nav>
        </header>
        <main>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <Login
                    setCounter={setCounter}
                    loading={loading}
                    setLoading={setLoading}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Signup
                    setCounter={setCounter}
                    loading={loading}
                    setLoading={setLoading}
                    showNotification={showNotification}
                    setShowNotification={setShowNotification}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
