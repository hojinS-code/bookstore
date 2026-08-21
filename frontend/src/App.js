import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterContainer from "./components/Register/RegisterContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HomeContainer from "./components/Home/HomeContainer";
import BooksContainer from "./components/Books/BooksContainer";
import FindIdContainer from "./components/FindId/FindIdContainer"
import ResetPasswordContainer from "./components/ResetPassword/ResetPasswordContainer"
import MyLoansContainer from "./components/MyLoans/MyLoansContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/" element={<HomeContainer />} />
        <Route path="/books" element={<BooksContainer />} />
        <Route path="/find-id" element={<FindIdContainer />} />
        <Route path="/reset-password" element={<ResetPasswordContainer />} />
        <Route path="/my-loans" element={<MyLoansContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;