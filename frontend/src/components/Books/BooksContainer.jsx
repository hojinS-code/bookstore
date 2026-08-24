import React, { useState, useEffect } from "react";
import { getBooks, createBook, updateBook, deleteBook, searchBooks } from "../../api/books";
import { borrowBook } from "../../api/loans";
import BooksPresenter from "./BooksPresenter";

function BooksContainer() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editQuantity, setEditQuantity] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async (query = "") => {
        const data = query ? await searchBooks(query) : await getBooks();
        setBooks(data);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        loadBooks(searchQuery);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!isLoggedIn) {
            setError("로그인이 필요한 기능입니다");
            return;
        }
        if (!title.trim() || !author.trim() || !isbn.trim()) {
            setError("제목, 저자, ISBN을 모두 입력해주세요");
            return;
        }
        try {
            await createBook({ title, author, isbn, quantity: Number(quantity) });
            setTitle("");
            setAuthor("");
            setIsbn("");
            setQuantity(1);
            loadBooks();
        } catch (err) {
            setError("ISBN이 중복되었습니다. 다른 ISBN을 입력해주세요.")
        }
    };

    const handleDelete = async (bookId) => {
        if (!isLoggedIn) {
            setError("로그인이 필요한 기능입니다");
            return;
        }
        try {
            await deleteBook(bookId);
            loadBooks();
        } catch (err) {
            setError("대출 기록이 있는 도서는 삭제할 수 없습니다");
        }
    };

    const handleBorrow = async (bookId) => {
        if (!isLoggedIn) {
            setError("로그인이 필요한 기능입니다");
            return;
        }
        try {
            await borrowBook(bookId);
            loadBooks();
        } catch (err) {
            setError("대출에 실패했습니다. 재고가 없을 수 있습니다");
        }
    };

    const startEdit = (book) => {
        setEditingId(book.id);
        setEditQuantity(book.quantity);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditQuantity("");
    };

    const saveEdit = async (book) => {
        try {
            await updateBook(book.id, {
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                quantity: Number(editQuantity),
            });
            setEditingId(null);
            loadBooks();
        } catch (err) {
            setError("수정에 실패했습니다");
        }
    };

    return (
        <BooksPresenter
            books={books}
            title={title}
            author={author}
            isbn={isbn}
            quantity={quantity}
            onTitleChange={(e) => setTitle(e.target.value)}
            onAuthorChange={(e) => setAuthor(e.target.value)}
            onIsbnChange={(e) => setIsbn(e.target.value)}
            onQuantityChange={(e) => setQuantity(e.target.value)}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            error={error}
            isLoggedIn={isLoggedIn}
            editingId={editingId}
            editQuantity={editQuantity}
            onEditQuantityChange={(e) => setEditQuantity(e.target.value)}
            onStartEdit={startEdit}
            onCancelEdit={cancelEdit}
            onSaveEdit={saveEdit}
            searchQuery={searchQuery}
            onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            onBorrow={handleBorrow}
        />
    );
}

export default BooksContainer;