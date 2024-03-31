import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/nav";
import Topnav from "./Components/Topnav";
import Home from "./Page/Home";
import Collections from "./Page/Collections";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Router>
        <Nav />
        <div style={{ width: "100%", marginLeft: "12rem" }}>
          <Topnav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmark/:origin/:id" element={<Collections />} />
            {/* <Route path="/about" element={<About />} />
          <Route path="/metaConn" element={<Metamask />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
