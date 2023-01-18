import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;