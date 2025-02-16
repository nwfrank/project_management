import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import Account from "./Screens/Account";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account session={session} />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={false}>
              <Routes>
                <Route index element={<About />} />
                {/* Add more nested routes here */}
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
