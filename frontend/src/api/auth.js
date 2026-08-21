import axios from "axios";

const API_URL = "https://bookstore-kwwn.onrender.com/auth";

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

export const findId = async (email) => {
    const response = await axios.post(`${API_URL}/find-id`, { email });
    return response.data;
};

export const resetPassword = async (data) => {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response.data;
};