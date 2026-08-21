import React from "react";
import { useNavigate } from "react-router-dom";
import HomePresenter from "./HomePresenter";

function HomeContainer() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    return <HomePresenter isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
}

export default HomeContainer;