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
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "8px",
    },
    editButton: {
        backgroundColor: "#3498db",
        color: "white",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "12px",
        marginLeft: "10px",
    },
    deleteButton: {
        backgroundColor: "#e74c3c",
        color: "white",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "12px",
        marginLeft: "10px",
    },
    borrowButton: {
        backgroundColor: "#9b59b6",
        color: "white",
        padding: "5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "12px",
        marginLeft: "10px",
    },
    smallInput: {
        width: "60px",
        padding: "5px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "12px",
    },
    bookItem: {
        backgroundColor: "white",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "5px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        background: "none",
        border: "none",
        color: "#888",
        cursor: "pointer",
        fontSize: "13px",
        marginBottom: "10px",
    },
    notice: {
        color: "#888",
        fontSize: "13px",
        marginBottom: "10px",
    },
    loadingText: {
        textAlign: "center",
        color: "#888",
        padding: "20px",
    },

    error: {
        color: "red",
    },
};

function BooksPresenter({ books, title, author, isbn, quantity, onTitleChange, onAuthorChange, onIsbnChange, onQuantityChange, onSubmit, onDelete,
    isLoggedIn, editingId, editQuantity, onEditQuantityChange, onStartEdit, onSaveEdit, onCancelEdit, searchQuery, onSearchQueryChange, onSearch, onBorrow, loading, error }) {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <button style={styles.backButton} onClick={() => navigate(-1)}>← 뒤로가기</button>
            <h1 style={styles.title}>도서 목록</h1>
            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={onSearch} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <input
                    type="text"
                    placeholder="제목 또는 저자로 검색"
                    value={searchQuery}
                    onChange={onSearchQueryChange}
                    style={{ ...styles.input, margin: 0 }}
                />
                <button type="submit" style={{ ...styles.button, marginTop: 0 }}>검색</button>
            </form>

            {!isLoggedIn && <p style={styles.notice}>※ 도서 추가/수정/삭제는 로그인 후 이용 가능합니다</p>}

            <form onSubmit={onSubmit}>
                <input type="text" placeholder="제목" value={title} onChange={onTitleChange} style={styles.input} />
                <input type="text" placeholder="저자" value={author} onChange={onAuthorChange} style={styles.input} />
                <input type="text" placeholder="ISBN" value={isbn} onChange={onIsbnChange} style={styles.input} />
                <input type="number" placeholder="수량" value={quantity} onChange={onQuantityChange} style={styles.input} />
                <button type="submit" style={styles.button}>도서 추가</button>
            </form>

            <div>
                {loading ? (
                    <p style={styles.loadingText}>불러오는중 ...</p>
                ) : (
                    books.map((book) => (
                        <div key={book.id} style={styles.bookItem}>
                            {editingId === book.id ? (
                                <>
                                    <span>{book.title} - {book.author} (재고: </span>
                                    <input
                                        type="number"
                                        value={editQuantity}
                                        onChange={onEditQuantityChange}
                                        style={styles.smallInput}
                                    />
                                    <span>)</span>
                                    <div>
                                        <button onClick={() => onSaveEdit(book)} style={styles.button}>저장</button>
                                        <button onClick={onCancelEdit} style={styles.deleteButton}>취소</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span>{book.title} - {book.author} (재고: {book.quantity})</span>
                                    <div>
                                        {book.quantity > 0 && (
                                            <button onClick={() => onBorrow(book.id)} style={styles.borrowButton}>대출</button>
                                        )}
                                        <button onClick={() => onStartEdit(book)} style={styles.editButton}>수정</button>
                                        <button onClick={() => onDelete(book.id)} style={styles.deleteButton}>삭제</button>
                                    </div>

                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default BooksPresenter;