import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    backButton: {
        background: "none",
        border: "none",
        color: "#888",
        cursor: "pointer",
        fontSize: "13px",
        marginBottom: "10px",
    },
    title: {
        color: "#333",
        borderBottom: "2px solid #4CAF50",
        paddingBottom: "10px",
        marginBottom: "16px",
    },
    infoRow: {
        display: "flex",
        padding: "8px 0",
        borderBottom: "1px solid #eee",
    },
    label: {
        width: "80px",
        color: "#888",
        fontWeight: "bold",
    },
    value: {
        color: "#333",
    },
    borrowButton: {
        backgroundColor: "#9b59b6",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "16px",
        width: "100%",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
    notFound: {
        textAlign: "center",
        color: "#888",
        padding: "40px",
    },
};

function BookDetailPresenter({ book, onBorrow, error, isLoggedIn }) {
    const navigate = useNavigate();

    if (!book) {
        return (
            <div style={styles.container}>
                <button style={styles.backButton} onClick={() => navigate(-1)}>← 뒤로가기</button>
                <p style={styles.notFound}>도서 정보를 찾을 수 없습니다</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>← 뒤로가기</button>
            <h1 style={styles.title}>{book.title}</h1>

            <div style={styles.infoRow}>
                <span style={styles.label}>저자</span>
                <span style={styles.value}>{book.author}</span>
            </div>
            <div style={styles.infoRow}>
                <span style={styles.label}>ISBN</span>
                <span style={styles.value}>{book.isbn}</span>
            </div>
            <div style={styles.infoRow}>
                <span style={styles.label}>재고</span>
                <span style={styles.value}>{book.quantity}권</span>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            {book.quantity > 0 ? (
                <button style={styles.borrowButton} onClick={onBorrow}>대출하기</button>
            ) : (
                <p style={styles.error}>대출 가능한 재고가 없습니다</p>
            )}
        </div>
    );
}

export default BookDetailPresenter;