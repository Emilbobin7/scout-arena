import { createContext, useState, useEffect, useContext } from 'react';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Socket.io integration ready — install socket.io-client to enable
    // import { io } from 'socket.io-client';
    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //     if (userInfo) {
    //         const newSocket = io('http://localhost:5000', {
    //             query: { userId: userInfo._id }
    //         });
    //         setSocket(newSocket);
    //         newSocket.on('getOnlineUsers', (users) => setOnlineUsers(users));
    //         return () => newSocket.close();
    //     }
    // }, []);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
