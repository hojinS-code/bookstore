import axios from "axios";


const API_URL = "http://127.0.0.1:8000/books";


const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};


export const getBooks = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};


export const createBook = async (bookData) => {
    const response = await axios.post(`${API_URL}/`, bookData, getAuthHeader());
    return response.data;
};


export const updateBook = async (bookId, bookData) => {
    const response = await axios.put(`${API_URL}/${bookId}`, bookData, getAuthHeader());
    return response.data;
};


export const deleteBook = async (bookId) => {
    const response = await axios.delete(`${API_URL}/${bookId}`, getAuthHeader());
    return response.data;
};


export const searchBooks = async (query) => {
    const response = await axios.get(`${API_URL}/search/?q=${query}`);
    return response.data;
}