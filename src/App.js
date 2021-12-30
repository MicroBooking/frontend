import React from "react";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import CreateListing from "./components/createlisting/CreateListing";
import ListingDetail from "./components/listingdetail/ListingDetail";
import MainPage from "./components/mainpage/MainPage";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <BrowserRouter>
          <Navbar />
    <Routes>
        <Route exact path="/details/:id" element={<ListingDetail/>}/>
        <Route exact path="/create" element={<CreateListing/>}/>
        <Route exact path="/" element={<MainPage />}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
