import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setClientToken } from "../../spotify";
import Library from "../library/library";
import Player from "../player/player";
import Trending from "../trending/trending";
import Favorites from "../favorites/favorites";
import Feed from "../feed/feed";
import "./home.css";
import Sidebar from "../../components/sidebar";
import Login from "../auth/login";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route
            path="https://Flooweron.github.io/music/"
            element={<Library />}
          />
          <Route
            path="https://Flooweron.github.io/music/feed"
            element={<Feed />}
          />
          <Route
            path="https://Flooweron.github.io/music/trending"
            element={<Trending />}
          />
          <Route
            path="https://Flooweron.github.io/music/player"
            element={<Player />}
          />
          <Route
            path="https://Flooweron.github.io/music/favorites"
            element={<Favorites />}
          />
        </Routes>
      </div>
    </Router>
  );
}
