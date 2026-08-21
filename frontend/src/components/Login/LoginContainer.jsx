import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import LoginPresenter from "./LoginPresenter"

function LoginContainer() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ username, password });
            localStorage.setItem("token", data.access_token);
            navigate("/");
        } catch (err) {
            setError("아이디 또는 비밀번호가 틀렸습니다");
        }
    };

    return (
        <LoginPresenter
            username={username}
            password={password}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
            error={error}
        />
    );
}

export default LoginContainer;