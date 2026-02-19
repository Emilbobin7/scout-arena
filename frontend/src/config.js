export const API_URL = import.meta.env.VITE_API_URL
    ? (import.meta.env.VITE_API_URL.startsWith('http') ? import.meta.env.VITE_API_URL : `https://${import.meta.env.VITE_API_URL}`)
    : "http://localhost:5000";

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL
    ? (import.meta.env.VITE_SOCKET_URL.startsWith('http') ? import.meta.env.VITE_SOCKET_URL : `https://${import.meta.env.VITE_SOCKET_URL}`)
    : "http://localhost:5000";
