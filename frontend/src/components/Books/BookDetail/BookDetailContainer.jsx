import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../../api/books";
import { borrowBook } from "../../../api/loans";
import BookDetailPresenter from "./BookDetailPresenter";

function BookDetailContainer() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState("");
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        loadBook();
    }, [bookId]);

    const loadBook = async () => {
        try {
            const data = await getBook(bookId);
            setBook(data);
        } catch (err) {
            setBook(null);
        }
    };

    const handleBorrow = async () => {
        setError("");
        if (!isLoggedIn) {
            setError("로그인이 필요한 기능입니다");
            return;
        }
        try {
            await borrowBook(bookId);
            loadBook();
        } catch (err) {
            const message = err.response?.data?.detail || "대출에 실패했습니다";
            setError(message);
        }
    };

    return (
        <BookDetailPresenter
            book={book}
            onBorrow={handleBorrow}
            error={error}
            isLoggedIn={isLoggedIn}
        />
    );
}

export default BookDetailContainer;