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
    tabButton: {
        backgroundColor: "#f0f0f0",
        color: "#333",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "13px",
        marginRight: "8px",
        marginBottom: "16px",
    },
    activeTabButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "13px",
        marginRight: "8px",
        marginBottom: "16px",
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
    returned: {
        color: "#4CAF50",
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

function MyLoansPresenter({ loans, onReturn, showHistory, onToggleView }) {
    const navigate = useNavigate();

    const isOverdue = (dueDate) => new Date(dueDate) < new Date();

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>← 뒤로가기</button>
            <h1 style={styles.title}>내가 빌린 책</h1>

            <div>
                <button
                    style={!showHistory ? styles.activeTabButton : styles.tabButton}
                    onClick={() => showHistory && onToggleView()}
                >
                    대출 중
                </button>
                <button
                    style={showHistory ? styles.activeTabButton : styles.tabButton}
                    onClick={() => !showHistory && onToggleView()}
                >
                    지난 기록
                </button>
            </div>

            {loans.length === 0 && <p style={styles.empty}>기록이 없습니다</p>}
            <div>
                {loans.map((loan) => (
                    <div key={loan.id} style={styles.loanItem}>
                        <span>
                            {loan.book.title} - {loan.book.author}
                            <br />
                            {loan.returned_at ? (
                                <span style={styles.returned}>반납 완료</span>
                            ) : (
                                <span style={isOverdue(loan.due_date) ? styles.overdue : styles.onTime}>
                                    반납 기한: {new Date(loan.due_date).toLocaleDateString()}
                                    {isOverdue(loan.due_date) && " (연체됨)"}
                                </span>
                            )}
                        </span>
                        {!loan.returned_at && (
                            <button onClick={() => onReturn(loan.id)} style={styles.returnButton}>반납</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyLoansPresenter;