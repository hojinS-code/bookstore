import axios from "axios";

const API_URL = "https://bookstore-kwwn.onrender.com/loans";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const borrowBook = async (bookId) => {
    const response = await axios.post(`${API_URL}/`, { book_id: bookId }, getAuthHeader());
    return response.data;
};

export const getMyLoans = async () => {
    const response = await axios.get(`${API_URL}/my`, getAuthHeader());
    return response.data;
};

export const returnBook = async (loanId) => {
    const response = await axios.post(`${API_URL}/${loanId}/return`, {}, getAuthHeader());
    return response.data;
};