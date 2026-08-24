import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        color: "#333",
        borderBottom: "2px solid #4CAF50",
        paddingBottom: "10px",
    },
    backButton: {
        background: "none",
        border: "none",
        color: "#888",
        cursor: "pointer",
        fontSize: "13px",
        marginBottom: "10px",
    },
    loanItem: {
        backgroundColor: "white",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "5px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    returnButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "12px",
    },
    overdue: {
        color: "#e74c3c",
        fontWeight: "bold",
    },
    onTime: {
        color: "#888",
    },
    empty: {
        color: "#888",
    },
};

function MyLoansPresenter({ loans, onReturn }) {
    const navigate = useNavigate();

    const isOverdue = (dueDate) => new Date(dueDate) < new Date();

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>← 뒤로가기</button>
            <h1 style={styles.title}>내가 빌린 책</h1>
            {loans.length === 0 && <p style={styles.empty}>현재 대출 중인 책이 없습니다</p>}
            <div>
                {loans.map((loan) => (
                    <div key={loan.id} style={styles.loanItem}>
                        <span>
                            대출번호 {loan.id} (책 ID: {loan.book_id})
                            <br />
                            <span style={isOverdue(loan.due_date) ? styles.overdue : styles.onTime}>
                                반납 기한: {new Date(loan.due_date).toLocaleDateString()}
                                {isOverdue(loan.due_date) && " (연체됨)"}
                            </span>
                        </span>
                        <button onClick={() => onReturn(loan.id)} style={styles.returnButton}>반납</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyLoansPresenter;