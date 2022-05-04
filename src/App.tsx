import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Signin } from "./page/Signin";
import { Signup } from "./page/Signup";
import { TotalTodos } from "./page/Total";
import { Header } from "./component/Header";
import { Today } from "./page/Today";
import { Mypage } from "./page/Mypage";
import { Done } from "./page/Done";
import { Expiration } from "./page/Expiration";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TotalTodos />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/today" element={<Today />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/isdone" element={<Done />} />
        <Route path="/expiration" element={<Expiration />} />
      </Routes>
    </Router>
  );
}

export default App;
