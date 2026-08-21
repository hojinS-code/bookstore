import React from "react";
import { Link } from "react-router-dom";

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
    },
    title: {
        color: "#333",
        borderBottom: "2px solid #4CAF50",
        paddingBottom: "10px",
    },
    link: {
        color: "#4CAF50",
        textDecoration: "none",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#e74c3c",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
    },
}
function HomePresenter({ isLoggedIn, onLogout }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>도서관리 메인 페이지</h1>
            {isLoggedIn ? (
                <div>
                    <p>로그인 되었습니다!</p>
                    <Link to="/books" style={styles.link}>도서 목록 보기</Link>
                    <br /><br />
                    <Link to="/my-loans" style={styles.link}>내가 빌린 책</Link>
                    <br></br>
                    <button onClick={onLogout} style={styles.button}>로그아웃</button>
                </div>
            ) : (
                <div>
                    <Link to="/login" style={styles.link}>로그인</Link> | <Link to="/register" style={styles.link}>회원가입</Link>
                </div>
            )}
        </div>
    );
}

export default HomePresenter;