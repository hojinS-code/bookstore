import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
    linkRow: {
        marginTop: "12px",
        fontSize: "13px",
        textAlign: "center",
    },
    link: {
        color: "#4CAF50",
        textDecoration: "none",
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

function LoginPresenter({ username, password, onUsernameChange, onPasswordChange, onSubmit, error }) {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>← 뒤로가기</button>
            <h1 style={styles.title}>로그인</h1>
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
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={onPasswordChange}
                    style={styles.input}
                />
                <br />
                <button type="submit" style={styles.button}>로그인</button>
            </form>
            <div style={styles.linkRow}>
                <Link to="/register" style={styles.link}>회원가입</Link>
                {" | "}
                <Link to="/find-id" style={styles.link}>아이디 찾기</Link>
                {" | "}
                <Link to="/reset-password" style={styles.link}>비밀번호 찾기</Link>
            </div>
        </div>
    );
}

export default LoginPresenter;