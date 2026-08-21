import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import ResetPasswordPresenter from "./ResetPasswordPresenter";

function ResetPasswordContainer() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult("");
        try {
            await resetPassword({ username, email, new_password: newPassword });
            setResult("비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다. ");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError("일치하는 계정 정보가 없습니다");
        }
    };

    return (
        <ResetPasswordPresenter
            username={username}
            email={email}
            newPassword={newPassword}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onNewPasswordChange={(e) => setNewPassword(e.target.value)}
            onSubmit={handleSubmit}
            result={result}
            error={error}
        />
    );
}

export default ResetPasswordContainer;