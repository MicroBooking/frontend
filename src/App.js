import React from "react";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import MainPage from "./components/mainpage/MainPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
          <Navbar />
    <Routes>

      <Route path="/" element={<MainPage />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
