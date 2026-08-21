import React, { useState } from "react";
import { findId } from "../../api/auth";
import FindIdPresenter from "./FindIdPresenter";

function FindIdContainer() {
    const [email, setEmail] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult("");
        try {
            const data = await findId(email);
            setResult(data.username);
        } catch (err) {
            setError("해당 이메일로 가입된 계정이 없습니다");
        }
    };

    return (
        <FindIdPresenter
            email={email}
            onEmailChange={(e) => setEmail(e.target.value)}
            onSubmit={handleSubmit}
            result={result}
            error={error}
        />
    );
}

export default FindIdContainer;