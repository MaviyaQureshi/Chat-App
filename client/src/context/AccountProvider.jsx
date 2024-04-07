import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null); // Initialize account state with null
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const socket = useRef(null); // Initialize socket ref with null

    useEffect(() => {
        // Create WebSocket connection using correct URL
        socket.current = io('wss://https://chat-app-1-vakd.onrender.com');

        // Event listener for handling connection errors
        socket.current.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error);
        });

        return () => {
            // Clean up WebSocket connection on component unmount
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
                showLoginButton,
                setShowLoginButton,
                showLogoutButton,
                setShowLogoutButton,
                socket,
                activeUsers,
                setActiveUsers,
                newMessageFlag,
                setNewMessageFlag,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
