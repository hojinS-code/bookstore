import React from "react"
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        color: "#333",
        borderBottom: "2px solid #4CAF50",
        paddingBottom: "10px",
    },
    input: {
        width: "100%",
        padding: "10px",
        margin: "8px 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxSizing: "border-box",
        fontSize: "14px",
    },
    button: {
        width: "100%",
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "8px",
    },
    backButton: {
        background: "none",
        border: "none",
        color: "#888",
        cursor: "pointer",
        fontSize: "13px",
        marginBottom: "10px",
    },
    error: {
        color: "red",
    },
};

function RegisterPresenter({ username, email, password, onUsernameChange, onEmailChange, onPasswordChange, onSubmit, error }) {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>← 뒤로가기</button>
            <h1 style={styles.title}>회원가입</h1>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={onUsernameChange}
                    style={styles.input}
                />
                <br />
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={onEmailChange}
                    style={styles.input}
                />
                <br />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onPasswordChange}
                    style={styles.input}
                />
                <br />
                <button type="submit" style={styles.button}>가입하기</button>
            </form>
        </div>
    )
}

export default RegisterPresenter;