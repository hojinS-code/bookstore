import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../api/auth"
import RegisterPresenter from "./RegisterPresenter"

function RegisterContainer() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, email, password });
            navigate("/login");
        } catch (err) {
            setError("회원가입에 실패했습니다. 이미 존재하는 아이디일 수 있습니다.");
        }
    };

    return (
        <RegisterPresenter
            username={username}
            email={email}
            password={password}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
            error={error}
        />
    );
}

export default RegisterContainer;